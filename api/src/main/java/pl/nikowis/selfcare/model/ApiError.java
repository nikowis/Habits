package pl.nikowis.selfcare.model;

import lombok.Data;

@Data
public class ApiError {

    private String error;
    private String message;

}
