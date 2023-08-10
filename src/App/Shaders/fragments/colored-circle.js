export const fragments = [
  `
uniform vec2 resolution;
uniform float time;
uniform float frequency;
uniform sampler2D sound;

#define freq(f) texture(sound, vec2(f, 0.25)).x
#define PI 3.1415926535897932384626433832795

vec3 hsl(float h, float s, float l) {
    vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

float smin(float a, float b, float k) {
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

float sdTorus(vec2 p, float r, float t) {
    return abs(length(p) - r) - t;
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float freqHue(float f) {
    return time * 0.1 + freq(0.1) * 0.1 + f * 0.15;
}

float freqV(float f) {
    return freq(f * 0.55 + 0.05) * (1.0 + f * 0.4) * 0.8;
}

float map(vec2 p, out vec3 color) {
    float t = 1e10;
    
    /*
    int count = 36;
    color = vec3(0);
    for (int i = 0; i < count; i++) {
        float f = float(i) / float(count - 1);
        f += 0.5;
        f = mod(f, 1.0);
        f = abs(mod(f, 1.0) - 0.5) * 2.0;
        
    	float v = freqV(f);
        
        vec2 pPart = p + vec2(cos(f * PI * 2.0), sin(f * PI * 2.0)) * 0.2;
        float tPart = sdCircle(pPart, 0.1);
        if (tPart < t) {
            if (tPart <= 0.0) {
                float li = -tPart * 15.0;
                li *= li * li;
                color = max(color, vec3(li) * hsl(freqHue(f), 0.5 + v, 0.1 + v));
            }
            t = tPart;
        }
    }
	*/
    
    
    float f = atan(p.x, p.y) / PI * 0.5 + 0.5;
    f += 0.5;
    f = mod(f, 1.0);
    f = abs(mod(f, 1.0) - 0.5) * 2.0;
    
    float v = freqV(f);
    
    float tTorus = sdTorus(p, freq(0.05) * 0.05 + 0.19 + v * 0.17, 0.002 + v * 0.13);
    if (tTorus < t) {
    	color = hsl(freqHue(f), 0.5 + v, 0.1 + v);
        t = tTorus;
    }
    
    
    return t;
}

vec3 pixel(vec2 coord) {
    float ar = resolution.x / resolution.y;
    vec2 uv = coord / resolution.xy;
    
    vec2 p = (uv - 0.5) * vec2(ar, 1.0);
    vec3 color = vec3(1.0, 0.0, 0.0);
    float dist = map(p, color);
    if (dist < 0.0) {
        return color;
    }
    
    // background
    return vec3(0.0);
}

void main() {
    gl_FragColor.rgb = (
        pixel(gl_FragCoord.xy) + 
        pixel(gl_FragCoord.xy + vec2(0.5, 0.0)) +
        pixel(gl_FragCoord.xy + vec2(0.0, 0.5)) +
        pixel(gl_FragCoord.xy + vec2(0.5, 0.5))
   	) / 4.0;
}`
]