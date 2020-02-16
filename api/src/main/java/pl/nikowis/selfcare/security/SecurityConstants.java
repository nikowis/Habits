package pl.nikowis.selfcare.security;

public class SecurityConstants {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String TOKEN_ROLE_KEY = "rol";
    public static final String TOKEN_ID_KEY = "id";
    public static final String TOKEN_ACTIVE_KEY = "act";
    public static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60;

    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_MOD = "ROLE_MOD";
}
