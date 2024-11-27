// vue.config.js - Angular의 angular.json 파일을 기반으로 Vue 프로젝트 설정으로 변환한 예시입니다.
module.exports = {
  // 빌드된 파일이 저장될 디렉토리 설정 (Angular의 "outputPath"에 해당)
  outputDir: 'dist/angular-demo',

  // 정적 파일의 위치 설정 (Angular의 "assets"에 해당)
  assetsDir: 'public',

  // CSS 소스 맵 설정 (Angular의 "sourceMap" 설정과 유사)
  css: {
    sourceMap: true,
  },

  // 개발 서버 설정 (Angular의 "serve"에 해당)
  devServer: {
    port: 4200, // 기본 포트를 4200으로 설정 (Angular의 기본 포트와 동일)
  },

  // Webpack 추가 설정 (빌드 최적화 등)
  configureWebpack: {
    devtool: 'source-map',
  },

  // 빌드 환경에 따라 추가 설정 (프로덕션/개발 설정 분리)
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimize(true);
      config.plugin('define').tap(definitions => {
        definitions[0]['process.env.OUTPUT_HASHING'] = JSON.stringify('all');
        return definitions;
      });
    } else {
      config.optimization.minimize(false);
      config.plugin('define').tap(definitions => {
        definitions[0]['process.env.OUTPUT_HASHING'] = JSON.stringify('none');
        return definitions;
      });
    }
  },

  // 프로덕션 모드에서의 성능 관련 설정
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
      };
    }
  },
};
