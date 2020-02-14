package pl.nikowis.selfcare.security;

public class SecurityConstants {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String TOKEN_ROLE_KEY = "rol";
    public static final String TOKEN_ID_KEY = "id";
    public static final String TOKEN_ACTIVE_KEY = "act";
    public static final String USER_ROLE = "USER";
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
}
