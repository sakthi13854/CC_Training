package com.urlshortener.service;

import com.urlshortener.dto.AnalyticsResponseDto;
import com.urlshortener.entity.ClickAnalytics;
import com.urlshortener.repository.ClickAnalyticsRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsService {

    private final ClickAnalyticsRepository analyticsRepository;

    @Async
    public void saveAnalytics(String shortCode, HttpServletRequest request) {
        try {
            String userAgent = request.getHeader("User-Agent");
            String ipAddress = request.getRemoteAddr();
            String referrer = request.getHeader("Referer");

            String browser = parseBrowser(userAgent);
            String os = parseOS(userAgent);
            
            // Dummy country/city logic, in real life use GeoIP service
            String country = "Unknown";
            String city = "Unknown";

            ClickAnalytics analytics = ClickAnalytics.builder()
                    .shortCode(shortCode)
                    .ipAddress(ipAddress)
                    .browser(browser)
                    .operatingSystem(os)
                    .country(country)
                    .city(city)
                    .referrer(referrer)
                    .build();

            analyticsRepository.save(analytics);
        } catch (Exception e) {
            log.error("Failed to save analytics for shortCode: {}", shortCode, e);
        }
    }

    public AnalyticsResponseDto getAnalytics(String shortCode) {
        List<ClickAnalytics> analyticsList = analyticsRepository.findByShortCode(shortCode);
        
        long totalClicks = analyticsList.size();
        long todayClicks = analyticsList.stream()
                .filter(a -> a.getClickedAt().toLocalDate().isEqual(LocalDate.now()))
                .count();

        Map<String, Long> browserStats = analyticsList.stream()
                .collect(Collectors.groupingBy(ClickAnalytics::getBrowser, Collectors.counting()));

        Map<String, Long> osStats = analyticsList.stream()
                .collect(Collectors.groupingBy(ClickAnalytics::getOperatingSystem, Collectors.counting()));

        Map<String, Long> countryStats = analyticsList.stream()
                .collect(Collectors.groupingBy(ClickAnalytics::getCountry, Collectors.counting()));

        return AnalyticsResponseDto.builder()
                .totalClicks(totalClicks)
                .todayClicks(todayClicks)
                .browserStats(browserStats)
                .osStats(osStats)
                .countryStats(countryStats)
                .build();
    }

    private String parseBrowser(String userAgent) {
        if (userAgent == null) return "Unknown";
        if (userAgent.contains("Chrome")) return "Chrome";
        if (userAgent.contains("Firefox")) return "Firefox";
        if (userAgent.contains("Safari")) return "Safari";
        if (userAgent.contains("Edge")) return "Edge";
        return "Other";
    }

    private String parseOS(String userAgent) {
        if (userAgent == null) return "Unknown";
        if (userAgent.contains("Windows")) return "Windows";
        if (userAgent.contains("Mac")) return "MacOS";
        if (userAgent.contains("Linux")) return "Linux";
        if (userAgent.contains("Android")) return "Android";
        if (userAgent.contains("iPhone")) return "iOS";
        return "Other";
    }
}
