package com.todo.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.todo.app.entity.Todo;
import com.todo.app.mapper.TodoMapper;

@Controller
public class AjaxController {

	@Autowired
	TodoMapper todoMapper;

	@RequestMapping(value = "/tasks")
	@ResponseBody
	public List<Todo> selectAll(Model model) {
		List<Todo> list = todoMapper.selectAll();
		System.out.println(list);
		List<Todo> responseData = new ArrayList<>();
		responseData.add(Todo.builder().task("レビューのTODOを消化する").done(0).due("2303-04-23").build());
		responseData.add(Todo.builder().task("カレンダーにレビューの予定を追加する").done(0).due("2303-04-23").build());
		responseData.add(Todo.builder().task("実装の進捗を報告する").done(0).due("2303-04-23").build());
		responseData.add(Todo.builder().task("Redmineのstatusを更新する").done(0).due("2303-04-23").build());
		return list;
	}

	@PostMapping(value = "/task/add")
	@ResponseBody
	public Todo addTask(@RequestBody Todo body) {
		todoMapper.add(body);
		return todoMapper.selectLatestTask();
	}
	
	@DeleteMapping(value="/task/delete/{todoId}")
	@ResponseBody
	public void delete(@PathVariable("todoId") long todoId) {
		todoMapper.delete(todoId);
	}
}
