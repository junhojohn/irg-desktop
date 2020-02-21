/*buttonAction.js 파일의 export 함수들을 사용하기 위해 import*/
var userModule = require(appRoot + '/resources/js/buttonAction');



/*최초에 JS파일이 로딩될 때 1번만 발생*/
$(document).ready(function() {
	var iCntLimit = 10;
	var iCnt = 0;
	
	// Check Remove Button Enable, Disable
	if(iCnt == 0){
		disableRemoveButtons();	
	}else{
		enableRemoveButtons();			
	}	
	
	// CREATE A "DIV" ELEMENT AND DESIGN IT USING jQuery ".css()" CLASS.
	$('#btAddPreference').click(function() {
		if (iCnt <= iCntLimit) {

			iCnt = iCnt + 1;

			// ADD TEXTBOX.

			cardContainer = document.createElement('div');
			cardContainer.setAttribute('id','id_cardContainer' + iCnt);
			container = $(cardContainer).css({
				margin: '20px', border: '1px dashed',
				borderTopColor: '#999', borderBottomColor: '#999',
				borderLeftColor: '#999', borderRightColor: '#999'
			});	
				

			$(container).append(
			'<div class="card bg-light mb-3" id=id_cardBorder' + iCnt + '>' + 
				
				'<div class="card-header" id=id_cardHeader' + iCnt + '>생성할 IR 프로젝트' + iCnt + '</div>' + 
				'<div class="card-body" id=id_cardBody' + iCnt + '>' +
					
					'<div class="form-group">' +
						'<label class="col-form-label" for="id_sw_name' + iCnt + '">프로젝트 명</label>' +
						'<input type="text" class="form-control" id="id_project_name' + iCnt + '" placeholder="예)TGCB">' +
					'</div>' +
					
					'<div class="form-group">' +
						'<label class="col-form-label" for="id_sw_main_id' + iCnt + '">프로젝트 메인버전(숫자)</label>' +
						'<input type="number" class="form-control" id="id_project_main_id' + iCnt + '" placeholder="예)31">' +
					'</div>' +		

					'<div class="form-group">' +
						'<label class="col-form-label" for="id_sw_sub_id' + iCnt + '">프로젝트 서브버전(숫자)</label>' +
						'<input type="number" class="form-control" id="id_project_sub_id' + iCnt + '" placeholder="예)22">' +
					'</div>' +						

					'<div class="form-group">' +
						'<label class="col-form-label" for="id_sw_svn_url' + iCnt + '">SVN URL</label>' +
						'<input type="text" class="form-control" id="id_sw_svn_url' + iCnt + '" placeholder="http:// 혹은 https:// 로 시작하는 주소">' +
					'</div>' +					

					'<div class="form-group">' +
						'<label class="col-form-label" for="id_sw_id' + iCnt + '">SVN 아이디</label>' +
						'<input type="text" class="form-control" id="id_svn_id' + iCnt + '" placeholder="SVN 아이디">' +
					'</div>' +					

					'<div class="form-group">' +
						'<label class="col-form-label" for="id_sw_id' + iCnt + '">SVN 비밀번호</label>' +
						'<input type="password" class="form-control" id="id_svn_pwd' + iCnt +'" placeholder="SVN 비밀번호">' +
					'</div>' +					

					'<div class="form-group">' +
						'<button type="button" class="btn btn-primary" disabled = true id="id_svn_check_btn' + iCnt + '"> SVN 연결 테스트 </button>' +
						'<button type="button" class="btn btn-primary" disabled = true id="id_version_check_btn' + iCnt + '"> 버전 유효성 체크 </button>' +
						'<button type="button" class="btn btn-primary" disabled = true id="id_version_init_btn' + iCnt + '"> 버전 초기화 </button>' +
					'</div>' +										
				'</div>' + 
				
			'</div>'
			);	
			
			
			userModule.createModel(iCnt);
			
			// Check Remove Button Enable, Disable
			if(iCnt == 0){
				disableRemoveButtons();	
			}else{
				enableRemoveButtons();			
			}
			
			// SHOW SUBMIT BUTTON IF ATLEAST "1" ELEMENT HAS BEEN CREATED.
			if (iCnt == 1) {
				var divSubmit = $(document.createElement('div'));
				$(divSubmit).append('<a class="btn btn-primary btn-lg" id="id_next_to_input_path_btn" ' + 
						'href="#id_section_input_path" onclick="markNavInputPathActive()" role=button>다음</a>');
			}

			// ADD BOTH THE DIV ELEMENTS TO THE "main" CONTAINER.
			$('#id_preference_main').after(container, divSubmit);
		}
		// AFTER REACHING THE SPECIFIED LIMIT, DISABLE THE "ADD" BUTTON.
		// (10 IS THE LIMIT WE HAVE SET)
		else {      
			$(container).append('<label>Reached the limit</label>'); 
			disableAddButton();
			
			
		}
	});

	// REMOVE ONE ELEMENT PER CLICK.
	$('#btRemovePreference').click(function() {
		Swal.fire({
		  title: '삭제하시겠습니까?',
		  text: "삭제 이후 저장되지 않은 데이터는 되돌릴 수 없습니다.",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes'
		}).then((result) => {
		  if (result.value) {
			
			if (iCnt != 0) { 
				$('#id_cardBorder' 		+ iCnt).remove(); 
				$('#id_cardHeader' 		+ iCnt).remove(); 
				$('#id_cardBody' 		+ iCnt).remove(); 
				
				$('#id_cardContents'	+ iCnt).remove(); 
				$('#id_cardContainer' 	+ iCnt).remove(); 
				
				userModule.deleteModel(iCnt);
				
				iCnt = iCnt - 1; 
				
				
			}
		
			if (iCnt == 0) { 
				$(container)
					.empty() 
					.remove(); 

				$('#id_next_to_input_path_btn').remove(); 
				
				disableRemoveButtons();
			}
			
			if((iCnt <= iCntLimit)){
				enableAddButton();		
			}		

			Swal.fire(
			  '삭제 성공!',
			  '삭제되었습니다.',
			  'success'
			)
			
		  }
		})
	});

	// REMOVE ALL THE ELEMENTS IN THE CONTAINER.
	$('#btRemoveAllPreference').click(function() {
		
		Swal.fire({
		  title: '삭제하시겠습니까?',
		  text: "삭제 이후 저장되지 않은 데이터는 되돌릴 수 없습니다.",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes'
		}).then((result) => {
		  if (result.value) {
			for(i = 0 ; i < iCnt ; i++){
				$('#id_cardBorder' 		+ (i+1)).remove(); 
				$('#id_cardHeader' 		+ (i+1)).remove(); 
				$('#id_cardBody' 		+ (i+1)).remove(); 
				
				$('#id_cardContents'	+ (i+1)).remove(); 
				$('#id_cardContainer' 	+ (i+1)).remove(); 	
			
			}
			
			userModule.deleteAllModel();			
			
			$(container)
				.empty()
				.remove(); 

			$('#id_next_to_input_path_btn').remove(); 
			iCnt = 0; 
			
			enableAddButton();

			disableRemoveButtons();	
			
			Swal.fire(
			  '삭제 성공!',
			  '삭제되었습니다.',
			  'success'
			)
			
		  }
		})					
	});
});

function enableAddButton(){
	$('#btAddPreference')
		.removeClass('btn btn-success disabled') 
		.addClass('btn btn-success');		
}

function disableAddButton(){
	$('#btAddPreference')
		.removeClass('btn btn-success')
		.addClass('btn btn-success disabled');
}

function enableRemoveButtons(){
	$('#btRemovePreference')
		.removeClass('btn btn-danger disabled') 
		.addClass('btn btn-danger');	
		
	$('#btRemoveAllPreference')
		.removeClass('btn btn-danger disabled') 
		.addClass('btn btn-danger');	
}

function disableRemoveButtons(){
	$('#btRemovePreference')
		.removeClass('btn btn-danger') 
		.addClass('btn btn-danger disabled');	
		
	$('#btRemoveAllPreference')
		.removeClass('btn btn-danger') 
		.addClass('btn btn-danger disabled');		
}

// PICK THE VALUES FROM EACH TEXTBOX WHEN "SUBMIT" BUTTON IS CLICKED.
var divValue, values = '';

function GetTextValue() {
	$(divValue) 
		.empty() 
		.remove(); 
	
	values = '';

	$('.input').each(function() {
		divValue = $(document.createElement('div')).css({
			padding:'5px', width:'200px'
		});
		values += this.value + '<br />'
	});

	$(divValue).append('<p><b>Your selected values</b></p>' + values);
	$('body').append(divValue);
}