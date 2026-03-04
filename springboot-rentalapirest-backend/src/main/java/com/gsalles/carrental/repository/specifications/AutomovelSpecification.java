package com.gsalles.carrental.repository.specifications;

import com.gsalles.carrental.entity.Automovel;
import org.springframework.data.jpa.domain.Specification;

public class AutomovelSpecification {
    public static Specification<Automovel> status(Automovel.Status status) {
        return (root, query, cb) ->
                status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Automovel> marca(String marca) {
        return (root, query, cb) ->
                marca == null ? null : cb.like(
                        cb.lower(root.get("marca")),
                        "%" + marca.toLowerCase() + "%"
                );
    }

    public static Specification<Automovel> modelo(String modelo) {
        return (root, query, cb) ->
                modelo == null ? null : cb.like(
                        cb.lower(root.get("modelo")),
                        "%" + modelo.toLowerCase() + "%"
                );
    }
}
