package com.template.backend.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${saas.app.jwtSecret}")
  private String secretKeyString;

  @Value("${saas.app.jwtExpirationMs}")
  private int expiration;

  private SecretKey getSecretKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKeyString);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String generateJwtToken(Authentication authentication) {
    String email = authentication.getName();
    Date currentDate = new Date();
    Date expireDate = new Date(currentDate.getTime() + expiration);

    SecretKey key = getSecretKey();
    logger.info("Generating JWT token for user: {}", email);
    return Jwts.builder()
        .subject(email)
        .issuedAt(new Date())
        .expiration(expireDate)
        .signWith(key)
        .compact();
  }

  public String getEmailFromJWT(String token) {
    Claims claims = Jwts.parser()
        .verifyWith(getSecretKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
    return claims.getSubject();
  }

  public boolean validateToken(String token) {
    try {
      SecretKey key = getSecretKey();
      Jwts.parser()
          .verifyWith(key)
          .build()
          .parseSignedClaims(token);
      return true;
    } catch (SecurityException | MalformedJwtException e) {
      logger.error("JWT was expired or incorrect: {}", e.getMessage());
      throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
    } catch (ExpiredJwtException e) {
      logger.error("Expired JWT token: {}", e.getMessage());
      throw new AuthenticationCredentialsNotFoundException("Expired JWT token.");
    } catch (UnsupportedJwtException e) {
      logger.error("Unsupported JWT token: {}", e.getMessage());
      throw new AuthenticationCredentialsNotFoundException("Unsupported JWT token.");
    } catch (IllegalArgumentException e) {
      logger.error("JWT token compact of handler are invalid: {}", e.getMessage());
      throw new AuthenticationCredentialsNotFoundException("JWT token compact of handler are invalid.");
    }
  }
}
