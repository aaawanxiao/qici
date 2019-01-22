
class PokerHandler {
	constructor() {
		this.tickState = 'normal';
	}

	start(totalAssetCount) {
		this.totalCount = totalAssetCount;
	}

	progress(curCount) {
		var percent = Math.floor(curCount / this.totalCount * 100);
		var progressBlock = document.getElementById('progressBlock');
		var progressPercent = document.getElementById('progressPercent');

		progressBlock.style.width = percent + "%";
		progressPercent.innerHTML = percent + "%";
	}

	finish() {
		this.tickState = 'fadeout';
		this.startFadingOutTime = new Date().getTime();
	}

	_tick() {
		var self = qici.loadingHandler;
		if (self.tickState === 'done')
			return;

		requestAnimationFrame(self._tick);

		var width = document.documentElement.clientWidth;
		if (window.innerWidth && window.innerWidth < width) {
			width = window.innerWidth;
		}
		var progressWidth = width - 40 > 640 ? 640 : width - 40;
		var height = document.documentElement.clientHeight;
		if (window.innerHeight && window.innerHeight < height) {
			height = window.innerHeight;
		}

		var progress = document.getElementById('progress');
		progress.style.width = progressWidth + "px";

		progress.style.top = height / 2 - 10 + "px";
		progress.style.left = (width - progressWidth) / 2 + "px";

		if (self.tickState === 'normal')
			return;

		var time = new Date().getTime();
		var delta = time - self.startFadingOutTime;

		var rate = delta / 500;
		if (rate > 1) {
			self.tickState = 'done';

			var loadingDiv = document.getElementById('loading');
			loadingDiv.parentNode.removeChild(loadingDiv);
		}
		else {
			document.getElementById('loading').style.opacity = 1 - rate;
		}
	}
}



if (qici.config.loadingHandler === 'PokerHandler') {
	document.write(`
		<div id="loading" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:10000;background:gray;">
			<div id="progress" style="position:absolute;width:320px;height:20px;background:#ebebeb;
			border-left:1px solid transparent;border-right:1px solid transparent;border-radius:10px;">
				<span id="progressBlock" style="width:0%;position: relative;float: left;margin: 0 -1px;min-width: 30px;
				height: 20px;line-height: 16px;text-align: right;background: #cccccc;border: 1px solid;border-color: #bfbfbf #b3b3b3 #9e9e9e;
				border-radius: 10px;background-image: -webkit-linear-gradient(top, #f0f0f0 0%, #dbdbdb 70%, #cccccc 100%);
				background-image: -moz-linear-gradient(top, #f0f0f0 0%, #dbdbdb 70%, #cccccc 100%);
				background-image: -o-linear-gradient(top, #f0f0f0 0%, #dbdbdb 70%, #cccccc 100%);
				background-image: linear-gradient(to bottom, #f0f0f0 0%, #dbdbdb 70%, #cccccc 100%);
				-webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
				box-shadow: inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
				right: 0;z-index: 1">
					<span style="position: absolute;border-radius: 10px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAASUlEQVQ4je3RMQ7AIBADwTnK+/9bqVMmoUBAqCJcWZa1zQYS1Z189OE9vLMEaUHLENSYOff22AGBsgOCLDPn3n6sHWtfIf5t7QLBYTNAaHlxVQAAAABJRU5ErkJggg==) 0 0 repeat-x;top: 0;bottom: 0;left: 0;
					right: 0;z-index: 1;height: 19px;"></span>
					<span id="progressPercent" style="padding: 0 8px;font-size: 11px;font-weight: bold;color: #404040;color: rgba(0, 0, 0, 0.7);
					text-shadow: 0 1px rgba(255, 255, 255, 0.4);">0%</span>
				</span>
			</div>
		</div>
	`);

	qici.loadingHandler = new PokerHandler();
	qici.loadingHandler._tick();
}