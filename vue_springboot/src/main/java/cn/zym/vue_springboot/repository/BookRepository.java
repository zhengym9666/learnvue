package cn.zym.vue_springboot.repository;

import cn.zym.vue_springboot.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @ClassName BookRepository
 * @Description TODO
 * @Author zhengym
 * @Date 2020/3/26 12:10
 * @Version 1.0
 */
public interface BookRepository extends JpaRepository<Book,Integer> {
}
