package pl.nikowis.selfcare.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import pl.nikowis.selfcare.dto.UserDTO;
import pl.nikowis.selfcare.model.User;
import pl.nikowis.selfcare.util.SecurityUtils;

import javax.servlet.ServletException;
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

        User currentUser = (User) authentication.getPrincipal();
        UserDTO dto = new UserDTO();
        dto.setId(currentUser.getId());
        dto.setLogin(currentUser.getLogin());
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());
        response.getWriter().append(new ObjectMapper().writeValueAsString(dto));
        response.setStatus(HttpServletResponse.SC_OK);

    }

}