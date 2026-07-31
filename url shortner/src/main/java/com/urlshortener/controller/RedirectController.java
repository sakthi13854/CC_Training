package com.urlshortener.controller;

import com.urlshortener.service.AnalyticsService;
import com.urlshortener.service.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class RedirectController {

    private final UrlService urlService;
    private final AnalyticsService analyticsService;

    // Only match alphanumeric characters, dashes, and underscores to prevent intercepting static files like index.html
    @GetMapping("/{shortCode:[a-zA-Z0-9_-]+}")
    public ResponseEntity<Void> redirect(@PathVariable String shortCode, HttpServletRequest request) {
        String originalUrl = urlService.resolveOriginalUrl(shortCode);
        
        if (originalUrl == null) {
            return ResponseEntity.notFound().build();
        }

        // Asynchronously save analytics
        analyticsService.saveAnalytics(shortCode, request);
        urlService.incrementClickCount(shortCode);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(originalUrl));
        
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }
}
