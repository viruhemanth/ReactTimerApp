var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');
var Timer = React.createClass({


    getInitialState : function () {
      return {
        count : 0,
        countdownStatus : 'stopped'
      };
    },
    componentDidUpdate : function (prevProps,prevState) {
      if(this.state.countdownStatus != prevState.countdownStatus) {
        switch (this.state.countdownStatus) {
          case 'started':
          this.startTimer();
          break;
          case 'stopped':
          this.setState({
            count : 0
          });
          case 'paused':
          clearInterval(this.timer)
            this.timer = undefined;
            break;

      }
    }
    },
    componentWillUnmount : function () {
      clearInterval(this.timer)
      this.timer = undefined;

    },
    startTimer : function () {
      this.timer = setInterval(()=>{
        var newCount = this.state.count+1;
        this.setState({
          count : newCount >= 0 ? newCount : 0
        });
        if(newCount === 0) {
          this.setState({
            countdownStatus : 'stopped'
          });
        }
      },1000);
    },
    handleSetCountDown : function (seconds) {
      this.setState({
        count : seconds,
        countdownStatus : 'started'
      });
    },
  handleStatusChange : function (newStatus) {
    this.setState({
      countdownStatus : newStatus
    });
  },


    render : function () {
      var {count,countdownStatus} = this.state;


        return(
            <div>
                <h1 className="page-title">Timer</h1>
                <Clock totalSeconds = {count}/>
                <Controls countdownStatus={countdownStatus} onStatusChanged={this.handleStatusChange} />

            </div>
        );
    }
});

module.exports = Timer;
