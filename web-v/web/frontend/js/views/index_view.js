App.IndexView = Ember.View.extend({
  templateName: "index",
  didInsertElement: function() {
    // htop

    /**
     * Display a message
     * @param {String} type - the message type in info,
     * alert, warn, etc.
     * @param {String} text - the message
     * @param {Boolean} clear - clear the msg box
     */
    function msg(type, text, clear){
      var $msgBox = $("#messages");
      if(clear === true){
        $msgBox.empty();
      }
      $msgBox.append("<p class='text-"+type+"'>"+text+"</p>");
    }

    /**
     * Change the state of the controls btns
     */
    function toggleCtrlState(){
      $(".controls .btn").toggleClass("disabled");
    }

    /**
     * Request informations about system
     * @param {Function} cb - executed once the infos are retrieved
     */
    function getSysInfos(cb){
      $.getJSON(remoteHost + "/sysinfos", function(data){
        if(data){
          $("#sysinfo > #hostname").text(data.hostname);
          $("#sysinfo > #type").text(data.type);
          $("#sysinfo > #arch").text(data.arch);
          $("#sysinfo > #release").text(data.release);
          $("#cpus > .count").text(data.cpus.count);
          $("#cpus > .model").text(data.cpus.model);
          cb();
        }
      });
    }

    /**
     * Helps you to translate stats to ui widgets
     * @class
     */
    var StatDisplayer = {
      /**
       * store the jquery elements for each stat widget
       * @type {Object}
       */
      _containers: {
        uptime: $("#uptime > .value"),
        loadP1: $("#loadavg .p1"),
        loadP5: $("#loadavg .p5"),
        loadP15: $("#loadavg .p15"),
        memPerUsed: $("#mem .perUsed"),
        memUsed: $("#mem .used"),
        memTotal: $("#mem .total"),
        memBar: $("#mem > .progress > .progress-bar-info"),
        nodePerUsed: $("#node-mem .perUsed"),
        nodeUsed: $("#node-mem .used"),
        nodeTotal: $("#node-mem .total"),
        nodeBar: $("#node-mem > .progress > .progress-bar-info"),
        swapPerUsed: $("#swap .perUsed"),
        swapUsed: $("#swap .used"),
        swapTotal: $("#swap .total"),
        swapBar: $("#swap > .progress > .progress-bar-info")
      },

      /**
       * zero prepender
       * @private
       * @param {Number} i - the number to be zero prepended
       * @returns {Strin} the number to display
       */
      _zprep: function(i){
        return (i >= 0 && i < 10) ? "0" + i : i;
      },

      /**
       * round to the decimal
       * @private
       * @param {Number} i - the input number
       * @param {Number} i - the number of decimals
       * @returns {Number} the output
       */
      _dec: function(i, num){
        var f = Math.pow(10, num);
        return Math.round(i * f) / f;
      },

      /**
       * display the uptime
       * @param {Object} values - the stats
       */
      uptime: function(values){
        var h = Math.floor(values.uptime / 3600),
          m = Math.floor((values.uptime / 60) % 60),
          s = values.uptime % 60;
        this._containers.uptime.text(this._zprep(h) + ":"
          + this._zprep(m) + ":" + this._zprep(s));
      },

      /**
       * display the load avg
       * @param {Object} values - the stats
       */
      load: function(values){
        this._containers.loadP1.text(this._dec(values.p1, 2));
        this._containers.loadP5.text(this._dec(values.p5, 2));
        this._containers.loadP15.text(this._dec(values.p15, 2));
      },
          
      /**
       * display the memory
       * @param {Object} values - the stats
       */
      mem: function(values){
        var mu = values.memtotal - values.memfree,
          mpu = this._dec(((mu * 100) / values.memtotal), 1),
          su = values.swaptotal - values.swapfree,
          spu = this._dec(((su * 100) / values.swaptotal), 1),
          muFormat = this._dec(mu/1024, 0),
          mtFormat =  this._dec(values.memtotal/1024, 0),
          suFormat = this._dec(su/1024, 0),
          stFormat =  this._dec(values.swaptotal/1024, 0);
        this._containers.memPerUsed.text(mpu);
        this._containers.memUsed.text(muFormat);
        this._containers.memTotal.text(mtFormat);
        this._containers.memBar.width(mpu + "%");
        this._containers.swapPerUsed.text(spu);
        this._containers.swapUsed.text(suFormat);
        this._containers.swapTotal.text(stFormat);
        this._containers.swapBar.width(spu + "%");
      },
          
      "node-mem": function(values){
        var mu = values.heapUsed,
          mpu = this._dec(((mu * 100) / values.heapTotal), 1),
          muFormat = this._dec(mu/(1024*1024), 0),
          mtFormat = this._dec(values.heapTotal/(1024*1024), 0);
        this._containers.nodePerUsed.text(mpu);
        this._containers.nodeUsed.text(muFormat);
        this._containers.nodeTotal.text(mtFormat);
        this._containers.nodeBar.width(mpu + "%");
      },
    };

    //keep the socket instance
    var statSock = null;
      
    /**
     * Start stat retrieving using a web socket
     */
    function start(){
      if(statSock === null){
        statSock = io.connect(remoteHost + "/stat");
        statSock.on("stat", function (data) {
          var displayer = StatDisplayer[data.type];
          if(typeof displayer === "function"){
            displayer.call(StatDisplayer, data.values);
          }
        });
      } else {
        statSock.socket.reconnect();
      }
      statSock.on("connect", function(){
        msg("success", "Retrieving data...", true);
      });
    }
      
    /**
     * Stop stat retrieval
     */
    function stop(){
      if(statSock){
        statSock.socket.disconnect();
        msg("info", "Stopped", true);
      }
    }
      
    //sequential
      
    msg("info", "Retrieving system infos...");
      
    //get system data
    getSysInfos(function(){
      $("#start").removeClass("disabled");
      msg("info", "Ready", true);
    });
      
    //bind start
    // $("#start").click(function(){
      toggleCtrlState();
      start();
      // return false;
    // });
      
    //bind stop
    // $("#stop").click(function(){
      // toggleCtrlState();
      // stop();
      // return false;
    // });

    // experiments progress bars
    var socket = io.connect(remoteHost+"/progress");

    var experiments = $("div.experiment");
    for(var i = 0; i<experiments.length; i++) {
      socket.emit("progress_load_experiment", experiments[i].id);
    }

    socket.on("progress", function (data) {
      // console.log("progress "+data.rid+" "+data.progress);

      // update progress bar
      $("div#"+data.rid+".container.experiment"
        + "> .row > .progress > .progress-bar")
        .css("width", data.progress);

      // update status if finished
      if (data.progress == "100%") {
        // green bar
        $("div#"+data.rid+".container.experiment"
          +"> .row > .progress > .progress-bar")
          .addClass("progress-bar-success");
      }
    });
  }
});
