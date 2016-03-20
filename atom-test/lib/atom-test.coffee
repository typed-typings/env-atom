AtomTestView = require './atom-test-view'
{CompositeDisposable} = require 'atom'

module.exports = AtomTest =
  atomTestView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @atomTestView = new AtomTestView(state.atomTestViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @atomTestView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-test:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @atomTestView.destroy()

  serialize: ->
    atomTestViewState: @atomTestView.serialize()

  toggle: ->
    console.log 'AtomTest was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
