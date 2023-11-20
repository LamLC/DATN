package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.dao.AccountDAO;
import com.project.dao.AuthorityDAO;
import com.project.dao.RoleDAO;
import com.project.entity.Account;
import com.project.entity.Authority;
import com.project.entity.Role;

@Controller
public class RegistrationController {

  @Autowired
  private AccountDAO accountDAO; // Đối tượng để thao tác với cơ sở dữ liệu
  @Autowired
  private RoleDAO roleDAO;
  @Autowired
  private AuthorityDAO authorityDAO;

  @RequestMapping("/register")
  public String showRegistrationForm() {
    return "register";
  }

  @PostMapping("/register")
  public String processRegistration(Account account, Model model) {
    // Thực hiện lưu dữ liệu vào cơ sở dữ liệu
	  accountDAO.save(account);
	  if (  account != null) {
		    // Tạo một đối tượng Role
		    Role role = new Role();
		    role.setId("CUST");
		    role.setName("Khach hang");
		    roleDAO.save(role);
		    Authority authority = new Authority();
		    authority.setAccount(account);
		    authority.setRole(role);
		    authorityDAO.save(authority);
		    
		    model.addAttribute("message", "Đăng kí thành công!");

		    return "security/login";
	  }else {
		  model.addAttribute("message", "Đăng kí thất bại!");
		  return "security/login";
	  }

//    role.setAuthorities();
    // Lưu vai trò vào cơ sở dữ liệu
    //tao mot doi tuong vao authory
//    Authority authority = new Authority();
//    authority.getAccount(account.getUsername());
//    authority.getRole(role.getId());
    
    
    // Hiển thị thông báo thành công
   
  }



}
