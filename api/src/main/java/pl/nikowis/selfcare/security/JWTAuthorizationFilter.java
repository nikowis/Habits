package pl.nikowis.selfcare.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import pl.nikowis.selfcare.model.UserDetailsImpl;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;


public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(JWTAuthorizationFilter.class);

    private String secret;

    public JWTAuthorizationFilter(AuthenticationManager authManager, String secret) {
        super(authManager);
        this.secret = secret;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HttpHeaders.AUTHORIZATION);

        if (header == null || !header.startsWith(SecurityConstants.BEARER_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String tokenHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String jwtToken;
        String role,username;
        Long id;
        Boolean active;
        if (tokenHeader != null && tokenHeader.startsWith(SecurityConstants.BEARER_PREFIX)) {
            jwtToken = tokenHeader.replace(SecurityConstants.BEARER_PREFIX, "");

            if(isTokenExpired(jwtToken)) {
                return null;
            }

            try {
                Jws<Claims> parsedClaims = Jwts.parser().setSigningKey(secret).parseClaimsJws(jwtToken);
                username = parsedClaims.getBody().getSubject();
                role = (String) parsedClaims.getBody().get(SecurityConstants.TOKEN_ROLE_KEY);
                id = ((Integer) parsedClaims.getBody().get(SecurityConstants.TOKEN_ID_KEY)).longValue();
                active = (Boolean) parsedClaims.getBody().get(SecurityConstants.TOKEN_ACTIVE_KEY);

                if (username != null) {
                    UserDetailsImpl userDetails = new UserDetailsImpl();
                    userDetails.setId(id);
                    userDetails.setLogin(username);
                    userDetails.setActive(active);
                    userDetails.setRole(role);
                    return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                }
            } catch (ExpiredJwtException exception) {
                LOGGER.warn("Request to parse expired JWT : {} failed : {}", jwtToken, exception.getMessage());
            } catch (UnsupportedJwtException exception) {
                LOGGER.warn("Request to parse unsupported JWT : {} failed : {}", jwtToken, exception.getMessage());
            } catch (MalformedJwtException exception) {
                LOGGER.warn("Request to parse invalid JWT : {} failed : {}", jwtToken, exception.getMessage());
            } catch (SignatureException exception) {
                LOGGER.warn("Request to parse JWT with invalid signature : {} failed : {}", jwtToken, exception.getMessage());
            } catch (IllegalArgumentException exception) {
                LOGGER.warn("Request to parse empty or null JWT : {} failed : {}", jwtToken, exception.getMessage());
            }
        } else {
            LOGGER.warn("JWT Token does not begin with Bearer String");
        }

        return null;
    }

    //check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }

}
