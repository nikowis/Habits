package pl.nikowis.selfcare.security;

import java.io.Serializable;

public class GenerateJWTResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;

    public GenerateJWTResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }
}
