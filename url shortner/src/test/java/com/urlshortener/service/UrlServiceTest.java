package com.urlshortener.service;

import com.urlshortener.dto.UrlRequestDto;
import com.urlshortener.dto.UrlResponseDto;
import com.urlshortener.entity.Url;
import com.urlshortener.exception.AliasAlreadyExistsException;
import com.urlshortener.repository.UrlRepository;
import com.urlshortener.util.Base62Encoder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UrlServiceTest {

    @Mock
    private UrlRepository urlRepository;

    @Mock
    private Base62Encoder base62Encoder;

    @Mock
    private StringRedisTemplate redisTemplate;
    
    @Mock
    private ValueOperations<String, String> valueOperations;

    @InjectMocks
    private UrlService urlService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(urlService, "baseUrl", "http://localhost:8080");
    }

    @Test
    void shortenUrl_WithoutCustomAlias_GeneratesShortCode() {
        UrlRequestDto requestDto = new UrlRequestDto();
        requestDto.setOriginalUrl("https://example.com");

        Url savedUrl = new Url();
        savedUrl.setId(1L);
        savedUrl.setOriginalUrl("https://example.com");

        when(urlRepository.save(any(Url.class))).thenReturn(savedUrl);
        when(base62Encoder.encode(1L)).thenReturn("1");

        UrlResponseDto responseDto = urlService.shortenUrl(requestDto);

        assertNotNull(responseDto);
        assertEquals("http://localhost:8080/1", responseDto.getShortUrl());
        verify(urlRepository, times(2)).save(any(Url.class));
    }

    @Test
    void shortenUrl_WithExistingCustomAlias_ThrowsException() {
        UrlRequestDto requestDto = new UrlRequestDto();
        requestDto.setOriginalUrl("https://example.com");
        requestDto.setCustomAlias("myalias");

        when(urlRepository.existsByCustomAlias("myalias")).thenReturn(true);

        assertThrows(AliasAlreadyExistsException.class, () -> urlService.shortenUrl(requestDto));
        verify(urlRepository, never()).save(any(Url.class));
    }
}
