package pl.nikowis.habits.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import pl.nikowis.habits.model.UserDetailsImpl;

public class SecurityUtils {

    public static UserDetailsImpl getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return ((UserDetailsImpl) authentication.getPrincipal());
        }
        return null;
    }

    public static Long getCurrentUserId() {
        UserDetailsImpl currentUser = getCurrentUser();
        if (currentUser != null) {
            return currentUser.getId();
        }
        return null;
    }
}