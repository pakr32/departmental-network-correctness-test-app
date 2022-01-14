function measure(filename) {
    var xhr = new XMLHttpRequest();
    var measure = {};
    xhr.open("GET", filename + '?' + (new Date()).getTime(), false);
    measure.start = (new Date()).getTime();
    xhr.send(null);
    measure.end = (new Date()).getTime();
    measure.len = parseInt(xhr.getResponseHeader('Content-Length') || 0);
    measure.delta = measure.end - measure.start;
    return measure;
  }
  
  /**
   * Requires that we pass a base url to the worker
   * The worker will measure the download time needed to get
   * a ~0KB and a 100KB.
   * It will return a string that serializes this informations as
   * pipe separated values
   */
  onmessage = function(e) {
    measure0 = measure(e.data.base_url + '/AS11-40-5875.med.png');
    measure100 = measure(e.data.base_url + '/AS11-40-5875.png');
    postMessage({
        measure0delta: measure0.delta,
        measure0len: measure0.len,
        measure100delta: measure100.delta,
        measure100len: measure100.len
    }
    );
  };