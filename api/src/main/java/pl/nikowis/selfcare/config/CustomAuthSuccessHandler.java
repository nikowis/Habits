package pl.nikowis.selfcare.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import pl.nikowis.selfcare.dto.UserDTO;
import pl.nikowis.selfcare.model.UserDetailsImpl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException {

        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();
        UserDTO dto = new UserDTO();
        dto.setId(currentUser.getId());
        dto.setLogin(currentUser.getUsername());
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());
        response.getWriter().append(new ObjectMapper().writeValueAsString(dto));
        response.setStatus(HttpServletResponse.SC_OK);

    }

}