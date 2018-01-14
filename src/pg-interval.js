var pgi = function (_interval) {
    // return new PGInterval(_interval);
  function PGI (interval) {
    var __FORMAT = {
      hours : 'hh',
      minutes: 'mm',
      seconds : 'ss',
    }

    var __values = {
      hours : '00',
      minutes : '00',
      seconds : '00',
      negative: false,
      ms: 0
    }

    this.version = '1.0.0';

    this.updateValue = function updateValue () {
      __values.ms += this.getHours()   * 60 * 60 * 1000;
      __values.ms += this.getMinutes() * 60 * 1000;
      __values.ms += this.getSeconds() * 1000;
    }

    this.parse = function parse (interval) {
      if(typeof interval !== 'string')
        return;

      __values.negative = /^(-).*/.test(interval);

      if(__values.negative)
        interval.replace('-');

      var splited = interval.split(':');


      switch(splited.length){
        case 1:
          __values.hours = '00';
          __values.minutes = '00';
          __values.seconds = splited[0];
          break;
        case 2:
          __values.hours = '00';
          __values.minutes = splited[0];
          __values.seconds = splited[1];
        case 3:
          __values.hours = splited[0];
          __values.minutes = splited[1];
          __values.seconds = splited[2];
          break;
      }

      this.updateValue();
    }

    this.getHours = function () {
      return __values.hours;
    }

    this.getMinutes = function () {
      return __values.minutes;
    }

    this.getSeconds = function () {
      return __values.seconds;
    }

    this.getValue = function () {
      return __values.ms;
    }

    function __formatIntervalSegment(format, whatToFormat) {
      var i = format.indexOf(__FORMAT[whatToFormat]);

      if(i === -1)
        return format;

      return format.replace(__FORMAT[whatToFormat], __values[whatToFormat]);
    }

    this.format = function format (format) {
      var sign = __values.negative ? '-' : '';
      if(!format)
        return sign + __values.hours + ':' + __values.minutes + ':'  + __values.seconds;

      format = __formatIntervalSegment(format, 'hours');
      format = __formatIntervalSegment(format, 'minutes');
      format = __formatIntervalSegment(format, 'seconds');

      return sign + format;
    }

    this.calcHours = function (value) {
      var y = 1000 * 60 * 60;
      var modulo = Math.abs(value) % y;

      value += value > 0 ? -modulo : modulo;
      value = value / y;

      if(value === 0)
        return 0;

      return Math.abs(value);
    }

    this.calcMinutes = function (value) {
      var y = 1000 * 60;
      var h = this.calcHours(value) * y * 60;
      var modulo;

      value -= value < 0 ? -h : h;

      modulo = Math.abs(value) % y;

      value += value > 0 ? -modulo : modulo;
      value = value / y;

      if(value === 0)
        return 0;

      return Math.abs(value);
    }

    this.calcSeconds = function (value) {
      var y = 1000;
      var h = this.calcHours(value) * y * 60 * 60;
      var m;
      var modulo;

      value -= value < 0 ? -h : h;

      m = this.calcMinutes(value) * y * 60;
      value -= value < 0 ? -m : m;

      modulo = Math.abs(value) % y;
      value += value > 0 ? -modulo : modulo;

      value = value / y;

      if(value === 0)
        return 0;

      return Math.abs(value);
    }

    this.parseFromValue = function () {
      var h = this.calcHours(__values.ms);
      var m = this.calcMinutes(__values.ms);
      var s = this.calcSeconds(__values.ms);

      __values.hours = __parseSingleValue(h);
      __values.minutes = __parseSingleValue(m);
      __values.seconds = __parseSingleValue(s);
    }

    this.subtract = function subtract(interval) {
      if(interval.constructor.name !== 'PGI'){
        throwError('subtract - first arg should be instance of PGInterval');
      }

      __values.ms -= interval.getValue();
      __values.negative = __values.ms < 0;

      this.parseFromValue();

      return this;
    }

    this.add = function subtract(interval) {
      if(interval.constructor.name !== 'PGI'){
        throwError('add - first arg should be instance of PGInterval');
      }

      __values.ms += interval.getValue();
      __values.negative = __values.ms < 0;

      this.parseFromValue();

      return this;
    }

    this.diff = function diff (interval) {
      if(interval.constructor.name !== 'PGI'){
        throwError('diff - first arg should be instance of PGInterval');
      }

      var pgi = new PGI(this.format());

      pgi.subtract(interval);

      return pgi;
    }

    this.half = function () {
      __values.ms = this.getValue() / 2;

      __values.negative = __values.ms < 0;

      this.parseFromValue();

      return this;
    }

    function throwError(){
      var args = Array.prototype.slice.call(arguments);

      throw new Error("PGI::" + args.join(' '));
    }

    function __parseSingleValue(value){
        var i = Math.abs(value).toString();

        i = i.length === 1 ? '0' + i : i;

        return i;
    }

    // Init
    this.parse(interval);
  }

  return new PGI (_interval);
};
