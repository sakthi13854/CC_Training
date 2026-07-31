package com.urlshortener.service;

import com.urlshortener.dto.UrlRequestDto;
import com.urlshortener.dto.UrlResponseDto;
import com.urlshortener.entity.Url;
import com.urlshortener.exception.AliasAlreadyExistsException;
import com.urlshortener.exception.UrlNotFoundException;
import com.urlshortener.repository.UrlRepository;
import com.urlshortener.util.Base62Encoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UrlService {

    private final UrlRepository urlRepository;
    private final Base62Encoder base62Encoder;
    private final StringRedisTemplate redisTemplate;

    @Value("${app.base-url}")
    private String baseUrl;

    private static final String CACHE_PREFIX = "url:";

    @Transactional
    public UrlResponseDto shortenUrl(UrlRequestDto requestDto) {
        if (requestDto.getCustomAlias() != null && !requestDto.getCustomAlias().isEmpty()) {
            if (urlRepository.existsByCustomAlias(requestDto.getCustomAlias())) {
                throw new AliasAlreadyExistsException("Custom alias already in use.");
            }
        }

        Url url = Url.builder()
                .originalUrl(requestDto.getOriginalUrl())
                .customAlias(requestDto.getCustomAlias())
                .expiresAt(requestDto.getExpiresAt())
                .active(true)
                .clickCount(0L)
                // temporary short code, will update after save
                .shortCode("temp") 
                .build();

        url = urlRepository.save(url);

        String shortCode = requestDto.getCustomAlias() != null && !requestDto.getCustomAlias().isEmpty()
                ? requestDto.getCustomAlias()
                : base62Encoder.encode(url.getId());
        
        url.setShortCode(shortCode);
        urlRepository.save(url);

        return mapToDto(url);
    }

    @Transactional(readOnly = true)
    public Url getUrlByShortCode(String shortCode) {
        return urlRepository.findByShortCode(shortCode)
                .orElseGet(() -> urlRepository.findByCustomAlias(shortCode)
                        .orElseThrow(() -> new UrlNotFoundException("URL not found for short code: " + shortCode)));
    }

    public String resolveOriginalUrl(String shortCode) {
        String cachedUrl = redisTemplate.opsForValue().get(CACHE_PREFIX + shortCode);
        if (cachedUrl != null) {
            return cachedUrl;
        }

        Url url = getUrlByShortCode(shortCode);
        
        if (!url.isActive() || (url.getExpiresAt() != null && url.getExpiresAt().isBefore(LocalDateTime.now()))) {
            return null; // Return null to indicate it can't be resolved (expired or inactive)
        }

        // Cache for 1 hour
        redisTemplate.opsForValue().set(CACHE_PREFIX + shortCode, url.getOriginalUrl(), 1, TimeUnit.HOURS);
        return url.getOriginalUrl();
    }

    @Transactional
    public void incrementClickCount(String shortCode) {
        Url url = getUrlByShortCode(shortCode);
        url.setClickCount(url.getClickCount() + 1);
        urlRepository.save(url);
    }

    @Transactional
    public UrlResponseDto updateUrl(Long id, UrlRequestDto requestDto) {
        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new UrlNotFoundException("URL not found with ID: " + id));

        url.setExpiresAt(requestDto.getExpiresAt());
        url = urlRepository.save(url);
        
        // Invalidate cache
        redisTemplate.delete(CACHE_PREFIX + url.getShortCode());
        if (url.getCustomAlias() != null) {
            redisTemplate.delete(CACHE_PREFIX + url.getCustomAlias());
        }

        return mapToDto(url);
    }

    @Transactional
    public void disableUrl(Long id) {
        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new UrlNotFoundException("URL not found with ID: " + id));
        url.setActive(false);
        urlRepository.save(url);
        redisTemplate.delete(CACHE_PREFIX + url.getShortCode());
    }

    @Transactional
    public void deleteUrl(Long id) {
        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new UrlNotFoundException("URL not found with ID: " + id));
        urlRepository.delete(url);
        redisTemplate.delete(CACHE_PREFIX + url.getShortCode());
    }

    @Transactional(readOnly = true)
    public Page<UrlResponseDto> getAllUrls(Pageable pageable) {
        return urlRepository.findAll(pageable).map(this::mapToDto);
    }
    
    @Transactional(readOnly = true)
    public UrlResponseDto getUrlDetails(Long id) {
        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new UrlNotFoundException("URL not found with ID: " + id));
        return mapToDto(url);
    }

    @Scheduled(cron = "0 0 * * * *") // Run every hour
    @Transactional
    public void cleanupExpiredLinks() {
        log.info("Running scheduled cleanup for expired links...");
        List<Url> expiredUrls = urlRepository.findByExpiresAtBefore(LocalDateTime.now());
        for (Url url : expiredUrls) {
            if (url.isActive()) {
                url.setActive(false);
                urlRepository.save(url);
                redisTemplate.delete(CACHE_PREFIX + url.getShortCode());
            }
        }
    }

    private UrlResponseDto mapToDto(Url url) {
        return UrlResponseDto.builder()
                .originalUrl(url.getOriginalUrl())
                .shortUrl(baseUrl + "/" + url.getShortCode())
                .expiresAt(url.getExpiresAt())
                .createdAt(url.getCreatedAt())
                .clickCount(url.getClickCount())
                .build();
    }
}
