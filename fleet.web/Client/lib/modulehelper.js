
Marionette.ModuleHelper = (function(Marionette, _) {
    "use strict";

    var moduleHelper = { };
//    moduleHelper.views = {};
    
    moduleHelper.templatePath = 'templates/';
    moduleHelper.templateExt = ".html";
    moduleHelper.templatePrefix = "";

    //moduleHelper.views.ItemView = Marionette.ItemView.extend({
    //    constructor: function () {
    //        Marionette.View.prototype.constructor.apply(this, Array.prototype.slice(arguments));
    //    },
    //})
    
    moduleHelper.loadModuleTemplates = function (module, callback) {
        // walk the views in the provided module
        // gather the templates used by each view
        // then preload them all
        // when done, call the callback
        moduleHelper.templatePath = module.templatePath;
        moduleHelper.templatePrefix = module.prefix;

        var templatesToLoad = [];
        for (var viewName in module.views) {
            var view = module.views[viewName];
            templatesToLoad.push(view.prototype.template);
        }
        var loadingTemplates = moduleHelper.preloadTemplates(templatesToLoad, module);
        $.when(loadingTemplates).done(callback);
    };

    moduleHelper.preloadTemplates = function (templateIds, context) {
        var loadAllTemplates = $.Deferred();
        var loadTemplatePromises = [];
        _.each(templateIds, function (templateId, index) {
            loadTemplatePromises[index] = moduleHelper.preloadTemplate(templateIds[index], moduleHelper);
        });
        var templatesRemainingToLoad = loadTemplatePromises.length;
        _.each(loadTemplatePromises, function (aLoadPromise) {
            $.when(aLoadPromise).done(function () {
                templatesRemainingToLoad--;
                if (templatesRemainingToLoad == 0)
                    loadAllTemplates.resolveWith(context); // 'this' context is the module
            });
        });
        return loadAllTemplates;
    };

    moduleHelper.preloadTemplate = function (templateId, context) {
        var loader = $.Deferred();
        var that = this;
        var msg;
        var err;
        if (!templateId || templateId.length == 0) {
            err = new Error('No templateId was specified - please provide a valid template id or filename.');
            err.name = "NoTemplateSpecified";
            throw err;
        }
        var hasHasTag = templateId.substr(0, 1) === '#';
        var template = hasHasTag ? $(templateId).html() : null;
        if (template && template.length > 0) {
            moduleHelper.storeTemplate(templateId, template);
            loader.resolveWith(context);

        } else {
            var dashPos = templateId.indexOf('-');
            var fileName = hasHasTag
                ? templateId.substr(1)
                : dashPos > 0
                    ? templateId.substr(dashPos + 1)
                    : templateId;
            var url = moduleHelper.templatePath + fileName + moduleHelper.templateExt;

            $.get(url, function (serverTemplate) {
                if (!serverTemplate || serverTemplate.length == 0) {
                    msg = "Could not find template: '" + templateId + "'";
                    err = new Error(msg);
                    err.name = "NoTemplateError";
                    throw err;
                }

                // templateId = (context.templatePrefix) ? context.templatePrefix + templateId : templateId;
                moduleHelper.storeTemplate(templateId, serverTemplate);
                loader.resolveWith(context);

            });
            return loader;
        }
    };


    moduleHelper.storeTemplate = function(templateId, template) {
        // compile template and store in cache
        template = Marionette.TemplateCache.prototype.compileTemplate(template);
        var cachedTemplate = new Marionette.TemplateCache(templateId);
        cachedTemplate.compiledTemplate = template;
        if (Marionette.TemplateCache.templateCaches[templateId] === undefined)
            Marionette.TemplateCache.templateCaches[templateId] = cachedTemplate;
    };

    return moduleHelper;
})(Marionette,_);




