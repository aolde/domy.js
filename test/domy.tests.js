/// <reference path="domy.js" />
/// <reference path="qunit.js" />
$(function () {

    // length

    test("check count of p-tags", function () {
        var size = D('#qunit-fixture p').size();
        var length = D('#qunit-fixture p').length;
        equal(size, 1, "Size should be one element");
        equal(length, 1, "Length should be one element");
    });

    // get, []

    test("check get() and []", function () {
        var p1 = D('#qunit-fixture p').get(0);
        var p2 = D('#qunit-fixture p')[0];
        equal(p1, p2, "Elements should be equal");
    });

    // each

    test("each should traverse all matched elements", function () {
        var count = 0;
        D('#qunit-fixture li').each(function () {
            count++;
        });
        equal(count, D('#qunit-fixture li').length, "count should be equal to length");
    });

    // prop

    test("set and get prop of element", function () {
        D('#qunit-fixture').prop('hello', 'world');
        var element = document.getElementById('qunit-fixture');

        equal(D('#qunit-fixture').prop('hello'), 'world', "hello property should equal prop('hello')'");
        equal(element.hello, 'world', "hello property should equal 'world'");
    });

    // attributes

    test("set and get attributes of element", function () {
        D('#qunit-fixture').attr('data-hello', 'world');
        var element = document.getElementById('qunit-fixture');

        equal(D('#qunit-fixture').attr('data-hello'), 'world', "data-hello attribute should equal attr('data-hello')");
        equal(element.attributes['data-hello'].value, 'world', "data-hello attribute should equal 'world'");
    });

    test("remove attributes of element", function () {
        D('#qunit-fixture').removeAttr('data-hello');
        var element = document.getElementById('qunit-fixture');

        equal(D('#qunit-fixture').attr('data-hello'), undefined, "data-hello attribute should be undefined");
        equal(element.attributes['data-hello'], undefined, "data-hello attribute should be undefined");
    });

    test("get undefined attribute should not fail", function () {
        var value = D('#qunit-fixture').attr('data-hello');

        equal(value, undefined, "empty attribute should return undefined");
    });

    // css

    test("set and get css color of element", function () {
        D('#qunit-fixture').css({ color: 'red' });
        var element = document.getElementById('qunit-fixture');

        equal(D('#qunit-fixture').css('color'), 'red', "css color should be red");
        equal(element.style['color'], 'red', "css color should be red");
    });

    test("set and get css color of element", function () {
        D('#qunit-fixture').css({ color: 'red' });
        var element = document.getElementById('qunit-fixture');

        equal(D('#qunit-fixture').css('color'), 'red', "css color should be red");
        equal(element.style['color'], 'red', "css color should be red");
    });

    // class

    test("add and remove class, and hasClass check", function () {
        var fixture = D('#qunit-fixture');

        // addClass
        fixture.addClass('domy');

        // hasClass
        ok(fixture.hasClass('domy'), "check class using Domy");
        ok(fixture.get(0).classList.contains('domy'), "check class using classList");

        // removeClass
        fixture.removeClass('domy');

        ok(!fixture.hasClass('domy'), "check class using Domy - no class");
        ok(!fixture.get(0).classList.contains('domy'), "check class using classList - no class");
    });

    // remove

    test("remove element and verify it's gone", function () {
        var fixture = D('#qunit-fixture ul li:last-child');

        // remove it
        fixture.remove();

        // update state
        fixture = D('#qunit-fixture ul li:last-child');

        // hasClass
        notEqual(fixture.text(), 'Hello4', "verify Hello4 doesn't exist");
        equal(D('#qunit-fixture ul li').length, 3, "should be three li elements");
    });

    // html & text

    test("html method should return content of first element", function () {
        var value = D('#qunit-fixture p').html();
        equal(value, 'test markup', "Should be equal to 'test markup'");
    });

    test("text method should return content of first element", function () {
        var value = D('#qunit-fixture p').text();
        equal(value, 'test markup', "Should be equal to 'test markup'");
    });

    test("change content of element with html()", function () {
        var value = D('#qunit-fixture p').html('hello world').html();
        equal(value, 'hello world', "Should be equal to 'hello world'");

        value = D('#qunit-fixture p').html('test markup').html();
        equal(value, 'test markup', "Should be equal to 'test markup'");
    });

    test("change content of element with text()", function () {
        var value = D('#qunit-fixture p').text('hello world').text();
        equal(value, 'hello world', "Should be equal to 'hello world'");

        value = D('#qunit-fixture p').text('test markup').text();
        equal(value, 'test markup', "Should be equal to 'test markup'");
    });

    // val

    test("value of input and textarea", function () {
        var inputValue = D('#qunit-fixture #input').val();
        var textareaValue = D('#qunit-fixture #textarea').val();

        equal(inputValue, 'HelloWorld', "Input should equal HelloWorld");
        equal(textareaValue, 'HelloWorld', "Textarea should equal HelloWorld");
    });

    test("change value of input and textarea", function () {
        var inputValue = D('#qunit-fixture #input').val('Hey').val();
        var textareaValue = D('#qunit-fixture #textarea').val('Hey').val();

        equal(inputValue, 'Hey', "Input should equal HelloWorld");
        equal(textareaValue, 'Hey', "Textarea should equal HelloWorld");
    });

    // ajax

    test("make ajax request", function () {
        stop();

        D.ajax({
            url: location.href,
            type: 'GET',

            success: function (response, xhr) {
                ok(response.length > 0, 'request finished successfully');
                start();
            },
            error: function (response, xhr) {
                ok(false, 'request failed ');
                start();
            }
        });
    });

    test("GET request using get method", function () {
        stop();
        
        D.get(location.href, { hello: 'world'}, function(response, xhr) {
            ok(response.length > 0, 'GET request finished successfully');
            start();
        });
    });
    
    test("POST request using post method", function () {
        stop();
        
        D.post(location.href, { hello: 'world'}, function(response, xhr) {
            ok(response.length > 0, 'POST request finished successfully');
            start();
        });
    });

});