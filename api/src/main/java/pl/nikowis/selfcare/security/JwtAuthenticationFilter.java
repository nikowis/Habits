package pl.nikowis.selfcare.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.nikowis.selfcare.model.UserDetailsImpl;

import javax.servlet.FilterChain;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    private String secret;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, String secret, AuthenticationFailureHandler authenticationFailureHandler) {
        this.authenticationManager = authenticationManager;
        this.secret = secret;
        this.setAuthenticationFailureHandler(authenticationFailureHandler);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            GenerateJwtRequest creds = new ObjectMapper()
                    .readValue(req.getInputStream(), GenerateJwtRequest.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException {
        UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();

        Map<String, Object> claims = new HashMap<>();
        claims.put(SecurityConstants.TOKEN_ROLE_KEY, user.getRole());
        claims.put(SecurityConstants.TOKEN_ID_KEY, user.getId());
        claims.put(SecurityConstants.TOKEN_ACTIVE_KEY, user.getActive());
        final String token = Jwts.builder().setClaims(claims).setSubject(user.getLogin()).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();

        Cookie tokenCookie = new Cookie(SecurityConstants.JWT_TOKEN_COOKIE, token);
        tokenCookie.setMaxAge(SecurityConstants.JWT_TOKEN_VALIDITY);
        tokenCookie.setHttpOnly(true);
        res.addCookie(tokenCookie);

    }
}
