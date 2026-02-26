package com.gsalles.carrental.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

public record AtualizarContatoDTO(
        @Email(message = "Email inválido")
        String email,
        @Pattern(
                regexp = "^\\d{10,11}$",
                message = "Telefone deve conter 10 ou 11 dígitos"
        )
        String telefone
) {}