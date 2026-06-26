package com.gsalles.carrental.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class AutomovelDTO {
    @NotBlank(message = "Marca é obrigatório")
    private String marca;
    @NotBlank(message = "Modelo é obrigatório")
    private String modelo;
    @NotBlank(message = "Cor é obrigatório")
    private String cor;
    @NotBlank(message = "Placa é obrigatório")
    @Pattern(regexp = "[A-Z]{3}-[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2}", message = "Placa deve atender ao padrão AAA-0000 ou AAA0A00")
    @Size(min = 7, max = 8, message = "Placa deve ter 8 caracteres")
    private String placa;
    @Positive(message = "Valor por minuto deve ser positivo")
    private BigDecimal valorPorMinuto;
}
