/**
 * 简易事件系统
 */
if(typeof wh === 'undefined'){
	var wh = {};
}
wh.Event = {
	// 调试模式
	debugMode: false,
	// 上一个事件
	lastEvent: null,
	_callStacks: {},
	

	// 绑定事件
	bind: function(signal, func, self){
		if(!wh.Event._callStacks[signal]){
			wh.Event._callStacks[signal] = [];
		}
		wh.Event._callStacks[signal].push({func:func, self:self, once: false});
	},
	
	// 优先绑定事件，确保该绑定在派发事件时第一个被调用
	bindPriority: function(signal, func, self){
		if(!wh.Event._callStacks[signal]){
			wh.Event._callStacks[signal] = [];
		}
		wh.Event._callStacks[signal].splice(0, 0, {func:func, self:self, once: false});
	},

	// 绑定一次，调用后销毁绑定
	bindOnce: function(signal, func, self){
		if(!wh.Event._callStacks[signal]){
			wh.Event._callStacks[signal] = [];
		}
		wh.Event._callStacks[signal].push({func:func, self:self, once: true});
	},
	
	// 优先绑定一次
	bindOncePriority: function(signal, func, self){
		if(!wh.Event._callStacks[signal]){
			wh.Event._callStacks[signal] = [];
		}
		wh.Event._callStacks[signal].splice(0, 0, {func:func, self:self, once: true});
	},

	// 解绑事件
	unbind: function(signal, func, self){
		if(!wh.Event._callStacks[signal]){return;}
		for(var i = 0; i < wh.Event._callStacks[signal].length; i++){
			if(wh.Event._callStacks[signal][i].func == func){
				wh.Event._callStacks[signal].splice(i, 1);
				return;
			}
		}

		if(wh.Event._callStacks[signal].length == 0){
			wh.Event._callStacks[signal] = null;
		}
	},

	// 移除事件及其所有绑定
	destroy: function(signal){
		wh.Event._callStacks[signal] = null;
	},

	// 派发事件
	call: function(signal, data){
		if(wh.Event.debugMode){
			console.log('调用事件: ' + signal, data);
		}
		wh.Event.lastEvent = {signal: signal, data: data};
		if(!wh.Event._callStacks[signal]){return;}
		var eves = wh.Event._callStacks[signal];
		for(var i = 0; i < eves.length; i++){
			var e = eves[i];
			if(e.func == null){
				console.log(signal);
			}
			e._processed = true;
			e.func.call(e.self, data);
			if(e.once){
				eves.splice(i, 1);
				i--;
			}
		}

		if(eves.length == 0){
			wh.Event.destroy(signal);
		}
	},
	
	// 事件是否被接收
	isProcessed: function(signal){
		var _isProcessed = false;
		if(wh.Event._callStacks[signal]){
			for(var i = 0; i < wh.Event._callStacks[signal].length; i++){
				_isProcessed = !!wh.Event._callStacks[signal][i]._processed;
				if(_isProcessed){
					break;
				}
			}
		}
		return _isProcessed;
	}
};
