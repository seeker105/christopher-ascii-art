{CompositeDisposable} = require 'atom'

module.exports =
  subscriptions: null

  activate: ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace',
      'christopher-ascii-art:convert': => @convert()

  deactivate: ->
    @subscriptions.dispose()

convert: ->
  if editor = atom.workspace.getActiveTextEditor()
    selection = editor.getSelectedText()

    figlet = require 'figlet'
    font = "O8"
    figlet selection, {font: font}, (error, art) ->
      if error
        console.error(error)
      else
        editor.insertText("\n#{art}\n")
