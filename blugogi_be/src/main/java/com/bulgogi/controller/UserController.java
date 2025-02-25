package com.kumugu.bulgogi.controller;


import com.kumugu.bulgogi.model.User;
import com.kumugu.bulgogi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user.getUsername(), user.getEmail(), user.getPassword());
        return ResponseEntity.ok(registeredUser);
    }
}
