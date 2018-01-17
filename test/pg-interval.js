const pgi = require('../dist/pg-interval.js')
const chai = require('chai');
const expect = chai.expect;

var currentVersion = '1.0.3';

console.log(pgi);
describe('pg-interval', () => {

  // -----------------

  describe('Init', () => {
    it('Expect to be an object',  () => {
      let p = pgi('01:20:50');

      expect(p).to.be.an('object');
    })

    it('Expect to have version property',  () => {
      expect(pgi()).to.have.property('version');
    })

    it('Expect version to be ' + currentVersion,  () => {
      expect(pgi().version).to.equal(currentVersion);
    })

    it('Expect to have updateValue method',  () => {
      expect(pgi().updateValue).to.be.an('function');
    })

    it('Expect to have parse method',  () => {
      expect(pgi().parse).to.be.an('function');
    })

    it('Expect to have getHours method',  () => {
      expect(pgi().getHours).to.be.an('function');
    })

    it('Expect to have getMinutes method',  () => {
      expect(pgi().getMinutes).to.be.an('function');
    })

    it('Expect to have getSeconds method',  () => {
      expect(pgi().getSeconds).to.be.an('function');
    })

    it('Expect to have getValue method',  () => {
      expect(pgi().getValue).to.be.an('function');
    })

    it('Expect to have format method',  () => {
      expect(pgi().format).to.be.an('function');
    })

    it('Expect to have calcHours method',  () => {
      expect(pgi().calcHours).to.be.an('function');
    })

    it('Expect to have calcMinutes method',  () => {
      expect(pgi().calcMinutes).to.be.an('function');
    })

    it('Expect to have calcSeconds method',  () => {
      expect(pgi().calcSeconds).to.be.an('function');
    })

    it('Expect to have parseFromMS method',  () => {
      expect(pgi().parseFromMS).to.be.an('function');
    })

    it('Expect to have isValidIntervalString method',  () => {
      expect(pgi().isValidIntervalString).to.be.an('function');
    })

    it('Expect to have isPGInterval method',  () => {
      expect(pgi().isPGInterval).to.be.an('function');
    })

    it('Expect to have add method',  () => {
      expect(pgi().add).to.be.an('function');
    })

    it('Expect to have subtract method',  () => {
      expect(pgi().subtract).to.be.an('function');
    })

    it('Expect to have multiply method',  () => {
      expect(pgi().multiply).to.be.an('function');
    })

    it('Expect to have diff method',  () => {
      expect(pgi().diff).to.be.an('function');
    })

    it('Expect to have half method',  () => {
      expect(pgi().half).to.be.an('function');
    })
  });

  describe('Interval string validation', () => {
    it('00:00:01 to be valid interval string', () => {
      expect(pgi().isValidIntervalString('00:00:01')).to.equal(true);
    })

    it('-00:00:01 to be valid interval string', () => {
      expect(pgi().isValidIntervalString('-00:00:01')).to.equal(true);
    })

    it('28:00:00 to be valid interval string', () => {
      expect(pgi().isValidIntervalString('28:00:00')).to.equal(true);
    })

    it('--00:00:01 to be invalid interval string', () => {
      expect(pgi().isValidIntervalString('--00:00:01')).to.equal(false);
    })

    it('aa:bb:cc to be invalid interval string', () => {
      expect(pgi().isValidIntervalString('aa:bb:cc')).to.equal(false);
    })

    it('10:00-13 to be invalid interval string', () => {
      expect(pgi().isValidIntervalString('10:00-13')).to.equal(false);
    })

    it('10:00:60 to be invalid interval string', () => {
      expect(pgi().isValidIntervalString('10:00:60')).to.equal(false);
    })

    it('10:00:59 to be valid interval string', () => {
      expect(pgi().isValidIntervalString('10:00:59')).to.equal(true);
    })
  });

  describe('Sign', () => {
    it('Positive',  () => {
      let p = pgi('01:20:50');

      expect(p.format()).to.equal('01:20:50');
    })
    it('Negative',  () => {
      let p = pgi('-01:20:50');

      expect(p.format()).to.equal('-01:20:50');
    })
  });

  // -----------------

  describe('Format', () => {
    let p = pgi('11:20:33');

    it('Custom 1', () => {
        expect(p.format('hh hours mm minutes ss seconds')).to.equal('11 hours 20 minutes 33 seconds');
    })
  });

  // -----------------

  describe('Math', () => {
    it('Add, using instance',  () => {
      let p1 = pgi('00:10:00');
      let p2 = pgi('00:10:00');

      expect(p1.add(p2).format()).to.equal('00:20:00');
    })

    it('Add, using interval string',  () => {
      let p = pgi('00:10:00').add('00:10:00');

      expect(p.format()).to.equal('00:20:00');
    })

    it('Subtract, using instance',  () => {
      let p1 = pgi('00:10:00');
      let p2 = pgi('00:09:00');

      expect(p1.subtract(p2).format()).to.equal('00:01:00');
    })

    it('Subtract, using interval string',  () => {
      let p = pgi('00:10:00').subtract('00:11:00');

      expect(p.format()).to.equal('-00:01:00');
    })

    it('Multiply by 0.5',  () => {
      let p = pgi('00:10:00').multiply(0.5);

      expect(p.format()).to.equal('00:05:00');
    })

    it('Multiply by -0.5',  () => {
      let p = pgi('00:10:00').multiply(-0.5);

      expect(p.format()).to.equal('-00:05:00');
    })

    it('Multiply by 10',  () => {
      let p = pgi('00:10:00').multiply(10);

      expect(p.format()).to.equal('01:40:00');
    })

    it('Diff',  () => {
      let p1 = pgi('10:00:00');
      let p2 = pgi('11:10:00');
      let p = p2.diff(p1);

      expect(p.format()).to.equal('01:10:00');
    })

    it('Half',  () => {
      let p = pgi('00:10:00').half();

      expect(p.format()).to.equal('00:05:00');
    })


  });

});
