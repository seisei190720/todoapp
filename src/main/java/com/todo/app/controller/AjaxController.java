package com.todo.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.todo.app.entity.Todo;

@Controller
public class AjaxController {

	@RequestMapping(value="/data/hello.json")
	@ResponseBody
	public List<Todo> helloworld(Model model) {
		List<Todo> responseData = new ArrayList<>();
		responseData.add(Todo.builder().title("レビューのTODOを消化する").done_flg(0).time_limit("2303-04-23").build());
		responseData.add(Todo.builder().title("カレンダーにレビューの予定を追加する").done_flg(0).time_limit("2303-04-23").build());
		responseData.add(Todo.builder().title("実装の進捗を報告する").done_flg(0).time_limit("2303-04-23").build());
		responseData.add(Todo.builder().title("Redmineのstatusを更新する").done_flg(0).time_limit("2303-04-23").build());
		return responseData;
	}
	
//	@RequestMapping(value="/data/hello.json")
//	@ResponseBody
//	public String helloworld(Model model) {
//		return "hello world";
//	}
	
	@RequestMapping(value="/data/undone-list")
	@ResponseBody
	public String fetchUndoneList(Model model) {
		System.out.println("ここ北");
		return "買い物に行く";
	}
}
