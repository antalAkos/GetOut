package com.codecool.getout.API;

import com.codecool.getout.model.User;
import com.codecool.getout.services.LoginService;
import com.codecool.getout.services.SecurityService;
import com.codecool.getout.services.UserService;
import com.codecool.getout.validator.UserValidator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class UserAPI {



    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private MessageSource messageSource;


    @GetMapping(value = "/registration")
    public String registration(Model model) {
        model.addAttribute("userForm", new User());

        return "registration";
    }

    @PostMapping(value = "/registration")
    public String registration(@ModelAttribute User userForm, BindingResult bindingResult, Model model) throws JsonProcessingException {
        userValidator.validate(userForm, bindingResult);

        if (bindingResult.hasErrors()) {

            return new ObjectMapper().writeValueAsString(messageSource.getMessage(bindingResult.getFieldErrors().get(0), null));
        }

        userService.save(userForm);

        securityService.autologin(userForm.getUsername(), userForm.getPasswordConfirm());

        return new ObjectMapper().writeValueAsString(userForm.getUsername());
    }


    @PostMapping(value = "/login")
    public String login(@ModelAttribute User userForm, Model model, String error, String logout) throws JsonProcessingException {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");

        return new ObjectMapper().writeValueAsString(userForm.getUsername());
    }



}
