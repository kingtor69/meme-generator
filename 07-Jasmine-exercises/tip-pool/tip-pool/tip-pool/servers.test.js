// starter code provided by Springboard, downloaded from curriculum (login required) 
//   http://curric.rithmschool.com/springboard/exercises/jasmine-testing-exercises/
//   2021 February 7 14:05 MST      
// except as noted, written by Tor Kingdon 2021

describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic 1st line by Springboard
    serverNameInput.value = 'Alice';
    // any additional initialization logic written by Tor
  });

  // test provided by Springboard
  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  afterEach(function() {
    // teardown logic by Tor
  });
});
