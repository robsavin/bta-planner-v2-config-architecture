const remToPx = () => ({
  postcssPlugin: 'rem-to-px',
  Declaration(decl) {
    if (decl.value && decl.value.includes('rem')) {
      decl.value = decl.value.replace(/(\d*\.?\d+)rem/g, (_, n) =>
        `${Math.round(parseFloat(n) * 16)}px`
      );
    }
  }
});
remToPx.postcss = true;

export default {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    remToPx
  ]
};
