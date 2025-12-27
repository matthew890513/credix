package com.rufirural.credixApi.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

public class JwtUtil {

    private final SecretKey key;
    private final long expirationMillis = 1000 * 60 * 60; // 1 hora

    public JwtUtil(String secret) {
        // Decodifica secret si viene en Base64, o usa directamente clave en bytes
        this.key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
    }

    public String generateToken(String username) {
        return Jwts.builder()
                   .setSubject(username)
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                   .signWith(key)
                   .compact();
    }

    public Claims extractAllClaims(String token) {
        try {
            // 🛠 El método parseClaimsJws está disponible **en el objeto construido por parser()**
            return Jwts.parser()
                       .verifyWith(key)     // configuración para verificar con la clave
                       .build()             // construir parser
                       .parseSignedClaims(token)  // parsea Signed JWT
                       .getPayload();       // obtiene el token
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
