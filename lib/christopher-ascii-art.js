'use babel';

import ChristopherAsciiArtView from './christopher-ascii-art-view';
import { CompositeDisposable } from 'atom';

export default {

  christopherAsciiArtView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.christopherAsciiArtView = new ChristopherAsciiArtView(state.christopherAsciiArtViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.christopherAsciiArtView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'christopher-ascii-art:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.christopherAsciiArtView.destroy();
  },

  serialize() {
    return {
      christopherAsciiArtViewState: this.christopherAsciiArtView.serialize()
    };
  },

  toggle() {
    console.log('ChristopherAsciiArt was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
