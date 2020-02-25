


/**
 * SVN 모듈
 */
var svnRepo = require('node-svn-ultimate');



/**
 * SweetAlert 모듈
 */
const Swal = require('sweetalert2');



/**
 * 일렉트론 프레임워크 Dialog 모듈
 */
const {shell} = require('electron');



/**
 * app root path 모듈
 */
const appRoot = require('app-root-path'); 



/**
 * winston 로거 모듈
 */
const logger = require(appRoot + '/resources/js/log/winston');



/**
 * DBUtils.js 파일의 export 함수들을 사용하기 위해 import
 */
const DBUtils = require(appRoot + '/resources/js/DBUtils');



/**
 * Utils.js 파일의 export 함수들을 사용하기 위해 import
 */
var utils = require(appRoot + '/resources/js/Utils');



/**
 * IRG Model 자료구조
 */
var irgModel = {
	
	baseCodePath : "",
	updateCodePath : "",
	irDocInputPath : "D:/00. Pioneer/f.스터디/2020/IRGenerator v2/ELECTRON_WORKSPACE/irg-desktop/templates",
	irDocInputFileName : "0000_HNB_SW_Integration_Request_.xlsm",
	irDocOutputPath : "",
	irgConfigInfoList : []
	
}



/**
 * 최초에 JS파일이 로딩될 때 1번만 발생
 */	
$(document).ready(function() {
	
	// 저장 폴더 경로 열기 버튼 클릭 시
	
	$('#id_output_btn').unbind('click').on('click', (e) => {

		shell.showItemInFolder(irgModel.irDocOutputPath + '/' + irgModel.irDocInputFileName);
		
	});
	
	// IR 생성 페이지에서 IRG 생성 버튼 클릭 시
	$('#id_irGen_btn').on('click', (e) => {

		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
				
		/*로그 찍기*/
		printAllIrgModelInfoLog();
		
		/*프로그레스 다이얼로그 출력*/
		var isSuccess = false;
		Swal.fire({
		  title: '진행 중',
		  html: 'IR 문서를 생성 중입니다...',
		  timer: 2000,
		  onBeforeOpen: () => {
			Swal.showLoading()
			isSuccess = utils.generateIRDoc(irgModel);
			logger.info("isSuccess:" + isSuccess);
			Swal.increaseTimer(2000)

		  },
		  onClose: () => {

		  }
		}).then((result) => {
		  if (
			/* Read more about handling dismissals below */
			result.dismiss === Swal.DismissReason.timer
		  ) {
			  
			if(isSuccess){
				// 출력폴더열기 버튼 활성화
				$('#id_output_btn').attr('class', 'btn btn-primary btn-lg');
				
				// 성공 모달 출력(우측상단)
				Swal.fire({
				  position: 'top-end',
				  type: 'success',
				  title: 'IR 문서 생성을 완료하였습니다.',
				  showConfirmButton: false,
				  timer: 1500
				})				
			}else{
				// 출력폴더열기 버튼 활성화
				$('#id_output_btn').attr('class', 'btn btn-primary btn-lg disabled');
				
				// 실패 모달 출력(우측상단)
				Swal.fire({
				  position: 'top-end',
				  type: 'error',
				  title: 'IR 문서 생성을 실패했습니다.',
				  showConfirmButton: false,
				  timer: 1500
				})								
			}
			
		  }
		})	
	});
		
	// IR 생성 NAV BAR 클릭 시
	$('#id_navlink_ir_gen, #id_next_to_irGen_btn').unbind('click').on('click', (e) => {
		
		logger.info("irgModel.irgConfigInfoList.length:" + irgModel.irgConfigInfoList.length);
		logger.info("irgModel.baseCodePath:" + irgModel.baseCodePath);
		logger.info("irgModel.updateCodePath:" + irgModel.updateCodePath);
				
		// 유효성 체크
		var errorMessage = utils.validationCheckerForIRGenButton(irgModel);
		
		if(errorMessage == null || errorMessage == ''){
			logger.info('OK');	
			$('#id_irGen_btn').attr('class', 'btn btn-primary btn-lg');
		}else{			
			logger.info(errorMessage);	
			$('#id_irGen_btn').attr('class', 'btn btn-primary btn-lg disabled');
		}		

		// TODO 개선 필요. 아이템이 모두 삭제되었을 때에는 이전 데이터가 그대로 남아 있다.		
		/*
		if(irgModel.irgConfigInfoList.length > 0){

			updateUITable();
			
		}
		*/
		
		// 개선 완료. 아이템이 모두 삭제되어 irgConfigInfoList.length가 0일 때도 clear하도록 수정함.
		updateUITable();
		
	});
	
	// BaseCode 경로가 입력되었을 때
	$('div').on('change', '#id_search_basecode_path', (e) => {
		irgModel.baseCodePath = document.getElementById("id_value_basecode_path").files[0].path;	
		logger.info("3irgModel.baseCodePath:" + irgModel.baseCodePath);
	});

	// UpdateCode 경로가 입력되었을 때	
	$('div').on('change', '#id_search_updatecode_path', (e) => {
		irgModel.updateCodePath = document.getElementById("id_value_updatecode_path").files[0].path;
		logger.info("irgModel.updateCodePath:" + irgModel.updateCodePath);
	});

	// IR 문서 출력 경로가 입력되었을 때	
	$('div').on('change', '#id_search_output_path', (e) => {
		irgModel.irDocOutputPath = document.getElementById("id_value_output_path").files[0].path;		
		logger.info("irgModel.irDocOutputPath:" + irgModel.irDocOutputPath);
	});	

});



/**
 * IRG Model의 모든 정보를 로그로 찍는다.
 */
function printAllIrgModelInfoLog(){
	
	logger.info(irgModel.baseCodePath);
	logger.info(irgModel.updateCodePath);
	logger.info(irgModel.irDocOutputPath);			
	logger.info(irgModel.irgConfigInfoList.length);	
	
	for(var i = 0 ; i < irgModel.irgConfigInfoList.length; i ++){

		printIrgConfigInfoLog(i);
	
	}
	
}



/**
 * 주어진 인덱스(iCnt)의 irgConfigInfoList의 아이템 정보를 로그로 찍는다.
 */
function printIrgConfigInfoLog(iCnt){

	var log = 	'irgModel.irgConfigInfoList[' + iCnt + '] {' +
				irgModel.irgConfigInfoList[iCnt].projectName 	+ ', ' + 
				irgModel.irgConfigInfoList[iCnt].projectMainVer + ', ' + 
				irgModel.irgConfigInfoList[iCnt].projectSubVer 	+ ', ' + 
				irgModel.irgConfigInfoList[iCnt].svnUrl 		+ ', ' + 
				irgModel.irgConfigInfoList[iCnt].svnId  		+ ', ' + 
				irgModel.irgConfigInfoList[iCnt].svnPwd  		+ ', ' + 
				irgModel.irgConfigInfoList[iCnt].isConnected + '}';			
	
	logger.info(log);
	
}



/**
 * IR 테이블을 업데이트한다.
 */
function updateUITable(){
	
	$('#id_irg_config_table tbody').empty();	
	logger.info("$('#id_irg_config_table tbody').empty();");
	
	var rowItem = '<tbody>';
	
	for(var k = 0 ; k < irgModel.irgConfigInfoList.length; k++){
		
		logger.info("for(var k = 0 ; k < irgModel.irgConfigInfoList.length; k++){");
		
		// DB Insert
		DBUtils.addIrConfigInfo(irgModel.irgConfigInfoList[k]);
		
		if(irgModel.irgConfigInfoList[k].isConnected == true){
			
			//rowItem    += '<tr class="' + 'table-light' + '">';	
			//rowItem    += '<tr class="' + 'table-active' + '">';	
			
			if(irgModel.irgConfigInfoList[k].isVersionOk == true){
				
				rowItem    += '<tr>';		
				
			}else{
				
				rowItem    += '<tr class="' + 'table-warning' + '">';		
				
			}
			
		}else{
			
			rowItem    += '<tr class="' + 'table-warning' + '">';	
			
		}	
		
		rowItem    += '<th scope="row">' + irgModel.irgConfigInfoList[k].projectName + '</th>';
		rowItem    += '<td>' + irgModel.irgConfigInfoList[k].projectMainVer + '</td>';
		rowItem    += '<td>' + irgModel.irgConfigInfoList[k].projectSubVer + '</td>';
		rowItem    += '<td>' + irgModel.irgConfigInfoList[k].isConnected + '</td>';
		rowItem    += '<td>' + irgModel.irgConfigInfoList[k].isVersionOk + '</td>';
		rowItem    += '</tr>';	
						
	}
	
	rowItem    += '</tbody>';	
	
	// ADD BOTH THE DIV ELEMENTS TO THE "main" CONTAINER.
	$('#id_irg_config_table').append(rowItem);	
	logger.info("$('#id_irg_config_table').append(rowItem);");
	logger.info("rowItem:" + rowItem);		
}	
	
/**
 * irgConfigInfoList의 모든 아이템을 삭제한다.
 */ 
var deleteAllModel = function(){
	var length = irgModel.irgConfigInfoList.length;
	
	// DB DELETE ALL RECORD
	DBUtils.deleteAllIrConfigInfo();
	
	for(var i = 0 ; i < length ; i ++){
		irgModel.irgConfigInfoList.pop();		
	}

}	
	
/**
 * 주어진 인덱스(iCnt)의 irgConfigInfoList 아이템 정보를 삭제한다.
 */
var deleteModel = function(iCnt){
	
	var iCntIdx = iCnt-1;
	
	logger.info("deleteModel called" + iCnt);
	logger.info("irgModel.irgConfigInfoList.length:" + irgModel.irgConfigInfoList.length);
	
	// DB DELETE RECORD
	DBUtils.deleteIrConfigInfo(irgModel.irgConfigInfoList[iCntIdx]);
	
	irgModel.irgConfigInfoList.pop();
	
	logger.info("irgModel.irgConfigInfoList.length:" + irgModel.irgConfigInfoList.length);
	
	
	/*
	$('div').off('click', '#id_svn_check_btn' + iCnt, (e) => {	
		logger.info("id_svn_check_btn" + iCnt + " off");
	});
	
	// 버전 유효성 체크 버튼이 눌렸을 때
	$('div').off('click', '#id_version_check_btn' + iCnt, (e) => {
		logger.info("id_version_check_btn" + iCnt + " off");
	});
	
	// 초기화 버튼이 눌렸을 때
	$('div').off('click', '#id_version_init_btn' + iCnt, (e) => {
		logger.info("id_version_init_btn" + iCnt + " off");
	});	
	
	// 프로젝트 명이 입력되었을 때 
	$('div').off('change', '#id_project_name' + iCnt, (e) => {
		
	});
	
	// 프로젝트 메인버전(숫자)이 입력되었을 때 	
	$('div').off('change', '#id_project_main_id' + iCnt, (e) => {
		
	});
	
	// 프로젝트 메인버전(숫자)이 입력되었을 때 	
	$('div').off('change', '#id_project_sub_id' + iCnt, (e) => {
		
	});	
	
	
	// SVN URL이 입력되었을 때 	
	$('div').off('change', '#id_sw_svn_url' + iCnt, (e) => {
		
	});
	
	// SVN 아이디가 입력되었을 때 	
	$('div').off('change', '#id_svn_id' + iCnt, (e) => {
		
	});
	
	// SVN 비밀번호가 입력되었을 때 	
	$('div').off('change', '#id_svn_pwd' + iCnt, (e) => {
		
	});		
	*/	
	
}



/**
 * 주어진 인덱스(iCnt)의 irgConfigInfoList의 아이템 정보를 추가한다.
 */
var createModel = function(iCnt){
	
	var iCntIdx = iCnt-1;
	
	logger.info("createModel called" + iCnt);

	var irgConfigInfo = {
		
		/*입력 프로젝트 명*/
		projectName : '',
		/*입력 프로젝트 메인버전(숫자)*/	
		projectMainVer : '',
		
		projectSubVer : '',
		/*입력 SVN URL*/	
		svnUrl : '',
		/*입력 SVN 아이디*/	
		svnId : '',
		/*입력 SVN 비밀번호*/	
		svnPwd : '',
		/*출력 파일 저장*/
		outputFileName: '',
		/*svn 연결 여부*/
		isConnected: false,
		/*버전 유효성 여부*/
		isVersionOk: false
		
	}		
	logger.info("irgModel.irgConfigInfoList.length:" + irgModel.irgConfigInfoList.length);
	irgModel.irgConfigInfoList.push(irgConfigInfo);
	logger.info("irgModel.irgConfigInfoList.length:" + irgModel.irgConfigInfoList.length);
	
	/* 동적으로 생성한 HTML 태그에는 해당 태그의 ID를 사용해 이벤트를 걸 수 없다.
	$('#id_svn_check_btn').click(function(){
		logger.info(e.target.value);
	});	
	*/
	
	/* 동적으로 생성한 HTML 태그에 이벤트를 걸려면,
	   정적으로 이미 생성된 부모 태그에 접근 후, 
	   하위 태그의 ID에 이벤트를 걸어야 한다. 
	*/
	// SVN 연결 테스트 버튼이 눌렸을 때
	$('div').on('click', '#id_svn_check_btn' + iCnt, (e) => {
		
		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
		
		printIrgConfigInfoLog(iCntIdx);
		
		var resultValue;
		svnRepo.util.getRevision("\"" + irgModel.irgConfigInfoList[iCntIdx].svnUrl + "\"", function(err, revision){
			
			if(err){
				
				/*				
				alert('연결 테스트에 실패하였습니다.');
				setTimeout(function(){
					$('#id_project_name').focus();
				}, 1);
				*/
				logger.info("Head err=" + err);	
				irgModel.irgConfigInfoList[iCntIdx].isConnected = false;
				Swal.fire('실패', '테스트 svn 연결을 실패하였습니다.', 'error');	
			}else{
				//alert('연결 테스트에 성공하였습니다.');
				logger.info("Head revision=" + revision);
				irgModel.irgConfigInfoList[iCntIdx].isConnected = true;
				Swal.fire('성공', '테스트 svn 연결을 성공하였습니다. @revision:' + revision, 'success');	
			}

		});					

	});

	// 버전 유효성 체크 버튼이 눌렸을 때
	$('div').on('click', '#id_version_check_btn' + iCnt, (e) => {

		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
		
		irgModel.irgConfigInfoList[iCntIdx].isVersionOk = true;		
		Swal.fire('완료', '버전 유효성 검사를 완료하였습니다.', 'info');	
	});
	
	// 초기화 버튼이 눌렸을 때
	$('div').on('click', '#id_version_init_btn' + iCnt, (e) => {

		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
		
		// 객체 값 초기화
		irgModel.irgConfigInfoList[iCntIdx].projectName = '';
		irgModel.irgConfigInfoList[iCntIdx].projectMainVer = '';
		irgModel.irgConfigInfoList[iCntIdx].projectSubVer = '';
		irgModel.irgConfigInfoList[iCntIdx].svnUrl = '';
		irgModel.irgConfigInfoList[iCntIdx].svnId = '';
		irgModel.irgConfigInfoList[iCntIdx].svnPwd = '';
		
		// 화면 초기화 업데이트
		$('#id_project_name' + iCnt).val(irgModel.irgConfigInfoList[iCntIdx].projectName);
		$('#id_project_main_id' + iCnt).val(irgModel.irgConfigInfoList[iCntIdx].projectMainVer);
		$('#id_project_sub_id' + iCnt).val(irgModel.irgConfigInfoList[iCntIdx].projectSubVer);
		$('#id_sw_svn_url' + iCnt).val(irgModel.irgConfigInfoList[iCntIdx].svnUrl);
		$('#id_svn_id' + iCnt).val(irgModel.irgConfigInfoList[iCntIdx].svnId);
		$('#id_svn_pwd' + iCnt).val(irgModel.irgConfigInfoList[iCntIdx].svnPwd);
		
	});	
	
	// 프로젝트 명이 입력되었을 때 
	$('div').on('change', '#id_project_name' + iCnt, (e) => {
		
		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
				
		irgModel.irgConfigInfoList[iCntIdx].projectName = e.target.value;
		
		var errorMessage = utils.validationCheckerForVersionTestButton(irgModel.irgConfigInfoList[iCntIdx]);		
		if(errorMessage == null || errorMessage == ''){
			logger.info('OK');	
			$('#id_version_check_btn' + iCnt).attr('disabled', false);
		}else{
			logger.info(errorMessage);	
			$('#id_version_check_btn' + iCnt).attr('disabled', true);
		}
		
	});
	
	// 프로젝트 메인버전(숫자)이 입력되었을 때 	
	$('div').on('change', '#id_project_main_id' + iCnt, (e) => {

		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}	
		
		irgModel.irgConfigInfoList[iCntIdx].projectMainVer = e.target.value;
		
		var errorMessage = utils.validationCheckerForVersionTestButton(irgModel.irgConfigInfoList[iCntIdx]);
		if(errorMessage == null || errorMessage == ''){
			logger.info('OK');	
			$('#id_version_check_btn' + iCnt).attr('disabled', false);
			$('#id_version_init_btn' + iCnt).attr('disabled', false);
		}else{			
			logger.info(errorMessage);	
			$('#id_version_check_btn' + iCnt).attr('disabled', true);
			$('#id_version_init_btn' + iCnt).attr('disabled', true);
		}
		
	});
	
	// 프로젝트 서브버전(숫자)이 입력되었을 때 	
	$('div').on('change', '#id_project_sub_id' + iCnt, (e) => {
		
		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
				
		irgModel.irgConfigInfoList[iCntIdx].projectSubVer = e.target.value;		
		
		var errorMessage = utils.validationCheckerForVersionTestButton(irgModel.irgConfigInfoList[iCntIdx]);
		if(errorMessage == null || errorMessage == ''){
			logger.info('OK');	
			$('#id_version_check_btn' + iCnt).attr('disabled', false);
			$('#id_version_init_btn' + iCnt).attr('disabled', false);
		}else{			
			logger.info(errorMessage);	
			$('#id_version_check_btn' + iCnt).attr('disabled', true);
			$('#id_version_init_btn' + iCnt).attr('disabled', true);
		}
		
	});	
	
	
	// SVN URL이 입력되었을 때 	
	$('div').on('change', '#id_sw_svn_url' + iCnt, (e) => {
		
		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
				
		irgModel.irgConfigInfoList[iCntIdx].svnUrl = e.target.value;	
		
		var errorMessage = utils.validationCheckerForSVNTestButton(irgModel.irgConfigInfoList[iCntIdx]);
		if(errorMessage == null || errorMessage == ''){
			logger.info('OK');	
			$('#id_svn_check_btn' + iCnt).attr('disabled', false);
		}else{
			logger.info(errorMessage);	
			$('#id_svn_check_btn' + iCnt).attr('disabled', true);
		}
		
	});
	
	// SVN 아이디가 입력되었을 때 	
	$('div').on('change', '#id_svn_id' + iCnt, (e) => {
		
		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
				
		irgModel.irgConfigInfoList[iCntIdx].svnId = e.target.value;	
		
		var errorMessage = utils.validationCheckerForSVNTestButton(irgModel.irgConfigInfoList[iCntIdx]);
		if(errorMessage == null || errorMessage == ''){
			logger.info('OK');	
			$('#id_svn_check_btn' + iCnt).attr('disabled', false);
		}else{			
			logger.info(errorMessage);	
			$('#id_svn_check_btn' + iCnt).attr('disabled', true);
		}
		
	});
	
	// SVN 비밀번호가 입력되었을 때 	
	$('div').on('change', '#id_svn_pwd' + iCnt, (e) => {

		// 이벤트가 중복적으로 Propagation이 되는 문제가 있음. 왜그러지? 방어처리.
		e.cancelBubble = true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
			
		irgModel.irgConfigInfoList[iCntIdx].svnPwd = e.target.value;
		
		var errorMessage = utils.validationCheckerForSVNTestButton(irgModel.irgConfigInfoList[iCntIdx]);
		if(errorMessage == null || errorMessage == ''){
			logger.info('OK');	
			$('#id_svn_check_btn' + iCnt).attr('disabled', false);
		}else{
			logger.info(errorMessage);				
			$('#id_svn_check_btn' + iCnt).attr('disabled', true);
		}
		
	});	
	
}



/**
 * export 하기. preference.js를 비롯한 다양한 js파일에서 export한 함수들을 사용할 수 있다.
 */
module.exports = {
	
	deleteModel: deleteModel,
	deleteAllModel: deleteAllModel,
	createModel: createModel
	
};


