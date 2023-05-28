package com.todo.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AjaxController {

	@RequestMapping(value="/data/hello.json")
	@ResponseBody
	public String helloworld(Model model) {
		return "hello world";
	}
	
	@RequestMapping(value="/data/undone-list")
	@ResponseBody
	public String fetchUndoneList(Model model) {
		return "買い物に行く";
	}
}
