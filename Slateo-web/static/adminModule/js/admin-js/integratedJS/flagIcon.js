    var input = document.querySelector("#phone");
    window.intlTelInput(input, {
        allowDropdown: false,
        autoHideDialCode: false,
        autoPlaceholder: "off",
        dropdownContainer: document.body,
        excludeCountries: ["us"],
        formatOnDisplay: false,
        geoIpLookup: function (callback) {
        $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
        });
      },
      hiddenInput: "full_number",
      initialCountry: "in",  //"auto",
      localizedCountries: {'in': 'India' },
      nationalMode: false,
      onlyCountries: ['us', 'gb', 'ch', 'ca', 'do', 'in'],
      placeholderNumberType: "MOBILE",
      preferredCountries: ['in', 'jp'],
      separateDialCode: true,
        utilsScript: "utils.js",
    });
// C: \Users\user\Desktop\slateO project\JAN 2021\09.01.2021\web - salteo - x\static\adminModule\js\integratedJS\utils.js