module.exports = function (norms) {

    var V = this;

    V.setNorms = function (norms) {
        V.norms = (norms !== undefined) ? norms : {};
    }

    V.setNorms(norms);

    function trueIfUndefined(val,ver) {
        var res = (val === undefined) ? true : ver;
        return res;
    }

    var checkers = {
        email: function (val) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var ver = re.test(val)
            return trueIfUndefined(val,ver);
        },
        required: function (val) {
            return val !== undefined && val.length > 0;
        },
        numeric: function (val) {
            var ver = !isNaN(val);
            return trueIfUndefined(val,ver);
        },
        alphanum: function (val) {
            var ver = /^\w*$/.test(val);
            return trueIfUndefined(val,ver);
        },
        maxln: function (val,options) {
            var ver = val.length <= options;
            return trueIfUndefined(val,ver);
        },
        minln: function (val,options) {
            var ver = val.length >= options;
            return trueIfUndefined(val,ver);
        },
        max: function (val,options) {
            var ver = Number(val) <= options;
            return trueIfUndefined(val,ver);
        },
        min: function (val,options) {
            var ver = Number(val) >= options;
            return trueIfUndefined(val,ver);
        },
    };

    V.check = function (form) {
        var res = true;
        var msgs = [];
        for (var field in V.norms) {
            if (V.norms.hasOwnProperty(field)) {
                var fieldNorms = V.norms[field][0];
                var fieldIsValid = true;
                fieldNorms.forEach(function (norm) {
                    var val = form[field];
                    var options;
                    if(/^(max|min)/.test(norm)){
                        // option have to get the value before changing norm (keep this code order)
                        options = norm.match(/\d+$/)[0]; // extracting option values
                        norm = norm.match(/^[a-zA-Z]+/)[0]; // extracting text that will be the check function name
                    }
                    var checkResult = checkers[norm](val,options);
                    if(!checkResult){
                        fieldIsValid = false;
                        res = false;
                    }
                });
                if(!fieldIsValid){
                    msgs.push(V.norms[field][1]);
                }
            }
        }
        return {
            valid: res,
            errors: msgs
        };
    }

}
