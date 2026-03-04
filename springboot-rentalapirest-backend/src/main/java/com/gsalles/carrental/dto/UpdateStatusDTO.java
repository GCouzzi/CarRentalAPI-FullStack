package com.gsalles.carrental.dto;

import com.gsalles.carrental.entity.Automovel;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusDTO(@NotNull(message = "Status é obrigatório.")
                              Automovel.Status status) {
}
