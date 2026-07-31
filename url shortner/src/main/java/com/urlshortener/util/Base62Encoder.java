package com.urlshortener.util;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class Base62Encoder {

    private static final String BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static final int BASE = BASE62_ALPHABET.length();

    public String encode(long id) {
        if (id == 0) {
            return String.valueOf(BASE62_ALPHABET.charAt(0));
        }

        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            sb.append(BASE62_ALPHABET.charAt((int) (id % BASE)));
            id /= BASE;
        }

        return sb.reverse().toString();
    }

    public String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * BASE);
            sb.append(BASE62_ALPHABET.charAt(index));
        }
        return sb.toString();
    }
}
