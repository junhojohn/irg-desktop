var sqlite3 = require('sqlite3').verbose();

//var dbPath = './irg.db';
var dbPath = './templates/db/irg.db';

var addEmptyIrProjectInfo = function(){
	var db = new sqlite3.Database(dbPath);	
	db.serialize(function(){
		var addStmt = db.prepare("INSERT OR REPLACE INTO IRProjectInfo VALUES (?, ?, ?, ?)");
		addStmt.run(1, "test1", "test2", "test3");
		addStmt.finalize();
	});
	db.close();		
}



function updateIrProjectInfo(baseCodeRootFolderPath, updateCodeRootFolderPath, irOutputRootFolderPath){

}



var addIrConfigInfo = function (irgConfigInfo){
	var db = new sqlite3.Database(dbPath);
	db.serialize(function(){
		var addStmt = db.prepare("INSERT OR REPLACE INTO IRConfigInfo VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		addStmt.run(irgConfigInfo.projectName, 1, 
					irgConfigInfo.projectMainVer, irgConfigInfo.projectSubVer, 
					irgConfigInfo.svnUrl, irgConfigInfo.svnId, 
					irgConfigInfo.svnPwd, irgConfigInfo.outputFileName,
					irgConfigInfo.isConnected, irgConfigInfo.isVersionOk);
		addStmt.finalize();	
	});
	db.close();	
}



var deleteIrConfigInfo = function (irgConfigInfo){
	var db = new sqlite3.Database(dbPath);
	db.serialize(function(){
		var addStmt = db.prepare("DELETE FROM IRConfigInfo WHERE configName == ?");
		addStmt.run(irgConfigInfo.projectName);
		addStmt.finalize();
	});
	db.close();		
};



var deleteAllIrConfigInfo = function (){
	var db = new sqlite3.Database(dbPath);
	db.serialize(function(){
		var addStmt = db.prepare("DELETE FROM IRConfigInfo");
		addStmt.run();
		addStmt.finalize();
	});
	db.close();			
}


function getIrConfigInfo(){
	db.serialize(function(){
		
	});
	db.close();	
}

function insertIrConfigInfo(){
	db.serialize(function(){
		
	});
	db.close();		
};

function selectIrConfigInfo(){
	db.serialize(function(){
		
	});
	db.close();		
};

function selectAllIrConfigInfo(){
	db.serialize(function(){
		
	});
	db.close();		
};

function updateIrConfigInfo(){
	db.serialize(function(){
		
	});
	db.close();		
};


/**
 * export 하기. buttonAction.js를 비롯한 다양한 js파일에서 export한 함수들을 사용할 수 있다.
 */
module.exports = {
	
	addEmptyIrProjectInfo: addEmptyIrProjectInfo,
	addIrConfigInfo: addIrConfigInfo,
	deleteIrConfigInfo: deleteIrConfigInfo,
	deleteAllIrConfigInfo: deleteAllIrConfigInfo
	
};
