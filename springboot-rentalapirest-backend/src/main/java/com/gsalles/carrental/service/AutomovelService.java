package com.gsalles.carrental.service;

import com.gsalles.carrental.dto.rdto.AutomovelResponseDTO;
import com.gsalles.carrental.entity.Automovel;
import com.gsalles.carrental.exception.AutomovelUniqueViolationException;
import com.gsalles.carrental.exception.EntityNotFoundException;
import com.gsalles.carrental.repository.AutomovelRepository;
import com.gsalles.carrental.repository.specifications.AutomovelSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutomovelService {

    private final AutomovelRepository repository;

    @Transactional
    public Automovel salvar(Automovel automovel) {
        if (repository.findByPlaca(automovel.getPlaca()).isPresent()) {
            throw new AutomovelUniqueViolationException("Placa já registrada");
        }
        return repository.save(automovel);
    }

    @Transactional(readOnly = true)
    public Automovel buscarPorPlaca(String placa) {
        return repository.findByPlaca(placa).orElseThrow(
                () -> new EntityNotFoundException("Placa não encontrada.")
        );
    }

    @Transactional(readOnly = true)
    public Automovel buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Id não encontrado.")
        );
    }

    @Transactional
    public void deleteByPlaca(String placa) {
        Long deletado = repository.deleteByPlaca(placa);
        if (deletado == 0) {
            throw new EntityNotFoundException("Placa não encontrada.");
        }
    }

    @Transactional(readOnly = true)
    public List<Automovel> buscarTodosCustom() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Automovel> buscarTodos(Automovel.Status status, String marca, String modelo, Pageable pageable) {
        Specification<Automovel> spec = Specification
                .where(status != null ? AutomovelSpecification.status(status) : null)
                .and((marca != null && !marca.isBlank()) ? AutomovelSpecification.marca(marca) : null)
                .and((modelo != null && !modelo.isBlank()) ? AutomovelSpecification.modelo(modelo) : null);
        return repository.findAll(spec, pageable);
    }

    @Transactional
    public Automovel updateByPlaca(String placa, Automovel.Status status){
        Automovel a = this.buscarPorPlaca(placa);
        a.setStatus(status);
        return repository.save(a);
    }
}
