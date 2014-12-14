package com.deniz.useradmin.services.login;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.json.JSONException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.deniz.framework.controller.ProcessControllerTemplate;
import com.deniz.framework.controller.TaskControllerTemplate;
import com.deniz.framework.controller.model.CosJsonArray;
import com.deniz.framework.controller.model.CosJsonFundamental;
import com.deniz.framework.controller.model.CosJsonList;
import com.deniz.framework.controller.model.CosJsonObject;
import com.deniz.framework.controller.model.CosJsonParameter;
import com.deniz.framework.controller.model.CosJsonProcess;
import com.deniz.framework.controller.model.CosJsonService;
import com.deniz.framework.controller.model.CosJsonTask;
import com.deniz.framework.controller.model.CosJsonText;
import com.deniz.framework.controller.utils.CosJsonHelper;
import com.deniz.role.business.AppRoleInteractionsService;
import com.deniz.role.business.domain.AppUserDto;

public class LoginProcessController extends MultiActionController {

	private AppRoleInteractionsService roleInteractionsService;

	public void setRoleInteractionsService(AppRoleInteractionsService roleInteractionsService) {
		this.roleInteractionsService = roleInteractionsService;
	}

	public ModelAndView init(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String baseUrl = request.getParameter("requestServer");
		String baseUrl2 = request.getParameter("requestContext");

		CosJsonProcess processJson = new CosJsonProcess("authentication");
		processJson.setLabel("Login").init();

		CosJsonArray<CosJsonTask> tasksList = new CosJsonArray<CosJsonTask>();
		processJson.put("items", tasksList);

		CosJsonArray<CosJsonObject> loginTaskItems = new CosJsonArray<CosJsonObject>();
		List<CosJsonObject> jsonObjects = new ArrayList<CosJsonObject>();
		jsonObjects.add(new CosJsonText("username", ""));
		jsonObjects.add(new CosJsonText("password", ""));
		loginTaskItems.addObjects(jsonObjects);

		CosJsonTask loginTask = new CosJsonTask("signin");
		loginTask.put("items", loginTaskItems).init().put("selected", true);

		List<CosJsonService> jsonServices = new ArrayList<CosJsonService>();
		CosJsonArray<CosJsonParameter> signinParameters = new CosJsonArray<CosJsonParameter>();
		signinParameters.addObjects(new CosJsonParameter("username")).addObjects(new CosJsonParameter("password"));
		jsonServices.add(new CosJsonService("signin").setUrl("authentication/login").setParameters(signinParameters));

		loginTask.put("services", jsonServices);

		tasksList.put(loginTask);
		tasksList.put(new CosJsonTask("help"));

		PrintWriter out = setWriterAsResponse(response);

		out.write(CosJsonHelper.prettyJson(processJson));
		out.flush();

		return null;
	}

	private PrintWriter setWriterAsResponse(HttpServletResponse response) {
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return out;
	}

	public ModelAndView login(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String userName = request.getParameter("username");
		String password = request.getParameter("password");
		AppUserDto user = roleInteractionsService.authenticate(userName, password);

		ModelAndView model = new ModelAndView("index");
		model.addObject("msg", "logined");

		return model;
	}

	public ModelAndView authorize(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView model = new ModelAndView("index");
		return model;
	}

}
