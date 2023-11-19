import { CommandObject } from './CommandAbstract';

export default {
  run(editor) {
    const lm = editor.LayerManager;
    const pn = editor.Panels;
    const lmConfig = lm.getConfig();
    console.log('lm', lm);
    console.log('lmConfig', lmConfig);
    console.log('lmConfig.appendTo', lmConfig.appendTo);

    if (lmConfig.appendTo) return;

    console.log('this.layers', this.layers);
    if (!this.layers) {
      const id = 'views-container';
      const layers = document.createElement('div');
      // @ts-ignore
      const panels = pn.getPanel(id) || pn.addPanel({ id });

      if (lmConfig.custom) {
        lm.__trgCustom({ container: layers });
      } else {
        layers.appendChild(lm.render());
      }

      panels.set('appendContent', layers).trigger('change:appendContent');
      this.layers = layers;
    }

    this.layers.style.display = 'block';
  },

  stop() {
    const { layers } = this;
    layers && (layers.style.display = 'none');
  },
} as CommandObject<{}, { [k: string]: any }>;
