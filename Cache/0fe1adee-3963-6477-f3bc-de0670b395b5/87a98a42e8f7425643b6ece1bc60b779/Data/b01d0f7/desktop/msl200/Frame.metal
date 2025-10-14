#include <metal_stdlib>
#include <simd/simd.h>
using namespace metal;
#ifdef borderOnly
#undef borderOnly
#endif
#ifdef cutOutCenter
#undef cutOutCenter
#endif
namespace SNAP_VS {
int sc_GetStereoViewIndex()
{
return 0;
}
}
#ifndef sc_TextureRenderingLayout_Regular
#define sc_TextureRenderingLayout_Regular 0
#define sc_TextureRenderingLayout_StereoInstancedClipped 1
#define sc_TextureRenderingLayout_StereoMultiview 2
#endif
// SCC_BACKEND_SHADER_FLAGS_BEGIN__
// SCC_BACKEND_SHADER_FLAG_DISABLE_FRUSTUM_CULLING
// SCC_BACKEND_SHADER_FLAGS_END__
//SG_REFLECTION_BEGIN(200)
//attribute vec4 boneData 5
//attribute vec3 blendShape0Pos 6
//attribute vec3 blendShape0Normal 12
//attribute vec3 blendShape1Pos 7
//attribute vec3 blendShape1Normal 13
//attribute vec3 blendShape2Pos 8
//attribute vec3 blendShape2Normal 14
//attribute vec3 blendShape3Pos 9
//attribute vec3 blendShape4Pos 10
//attribute vec3 blendShape5Pos 11
//attribute vec4 position 0
//attribute vec3 normal 1
//attribute vec4 tangent 2
//attribute vec2 texture0 3
//attribute vec2 texture1 4
//attribute vec4 color 18
//attribute vec3 positionNext 15
//attribute vec3 positionPrevious 16
//attribute vec4 strandProperties 17
//output vec4 sc_FragData0 0
//sampler sampler backgroundTextureSmpSC 0:18
//sampler sampler circleTextureSmpSC 0:19
//sampler sampler intensityTextureSmpSC 0:20
//sampler sampler sc_ScreenTextureSmpSC 0:25
//texture texture2D backgroundTexture 0:1:0:18
//texture texture2D circleTexture 0:2:0:19
//texture texture2D intensityTexture 0:3:0:20
//texture texture2D sc_ScreenTexture 0:15:0:25
//ubo float sc_BonesUBO 0:0:96 {
//sc_Bone_t sc_Bones 0:[1]:96
//float4 sc_Bones.boneMatrix 0:[3]:16
//float4 sc_Bones.normalMatrix 48:[3]:16
//}
//ubo int UserUniforms 0:28:5312 {
//float4 sc_Time 1376
//float4 sc_UniformConstants 1392
//float4x4 sc_ViewProjectionMatrixArray 1680:[2]:64
//float4x4 sc_ModelViewMatrixArray 1936:[2]:64
//float4x4 sc_ProjectionMatrixArray 2384:[2]:64
//float4x4 sc_ProjectionMatrixInverseArray 2512:[2]:64
//float4x4 sc_ViewMatrixArray 2640:[2]:64
//float4x4 sc_PrevFrameViewProjectionMatrixArray 2896:[2]:64
//float4x4 sc_ModelMatrix 3024
//float4x4 sc_ModelMatrixInverse 3088
//float3x3 sc_NormalMatrix 3152
//float4x4 sc_PrevFrameModelMatrix 3248
//float4 sc_CurrentRenderTargetDims 3456
//sc_Camera_t sc_Camera 3472
//float3 sc_Camera.position 0
//float sc_Camera.aspect 16
//float2 sc_Camera.clipPlanes 24
//float sc_ShadowDensity 3504
//float4 sc_ShadowColor 3520
//float4x4 sc_ProjectorMatrix 3536
//float4 weights0 3616
//float4 weights1 3632
//float4 sc_StereoClipPlanes 3664:[2]:16
//float2 sc_TAAJitterOffset 3704
//float4 voxelization_params_0 3824
//float4 voxelization_params_frustum_lrbt 3840
//float4 voxelization_params_frustum_nf 3856
//float3 voxelization_params_camera_pos 3872
//float4x4 sc_ModelMatrixVoxelization 3888
//float correctedIntensity 3952
//float3x3 intensityTextureTransform 4016
//float4 intensityTextureUvMinMax 4064
//float4 intensityTextureBorderColor 4080
//int PreviewEnabled 4244
//float alphaTestThreshold 4252
//float2 size 4256
//float cornerRadius 4264
//float3x3 backgroundTextureTransform 4320
//float4 backgroundTextureUvMinMax 4368
//float4 backgroundTextureBorderColor 4384
//float useTexture 4400
//float2 textureMode 4408
//float textureWrap 4416
//float4 backgroundColor 4432
//float4 colors 4448:[6]:16
//float percents 4544:[6]:4
//int stops 4568
//float linearGradientStart 4572
//float linearGradientAngle 4580
//float linearGradientLength 4584
//float2 gradientStartPosition 4592
//float radialGradientLength 4600
//float border 4604
//float borderSize 4608
//float gradientType 4612
//float4 highlightColorStop2 4624
//float4 highlightColorStop1 4640
//float highlightStop1 4656
//float highlightStop2 4660
//float2 cursorPosition 4664
//float highlightSize 4672
//float4 highlightActiveColorStop2 4688
//float4 highlightActiveColorStop1 4704
//float isActive 4720
//float isHovered 4724
//float3x3 circleTextureTransform 4784
//float4 circleTextureUvMinMax 4832
//float4 circleTextureBorderColor 4848
//bool borderOnly 4864
//bool cutOutCenter 4868
//float frameBorder 4872
//float4 grabZones 4880:[8]:16
//float grabZonesCount 5008
//float dotsHighlightStop1 5012
//float dotsHighlightStop2 5016
//float dotsScalar 5020
//float4 borderColor 5024
//float4 borderGradientColors 5040:[6]:16
//float borderGradientPercents 5136:[6]:4
//int borderGradientStops 5160
//float borderLinearGradientStart 5164
//float borderLinearGradientAngle 5172
//float borderLinearGradientLength 5176
//float2 borderGradientStartPosition 5184
//float borderRadialGradientLength 5192
//float borderGradientType 5196
//float edgeHighlightStop1 5200
//float edgeHighlightStop2 5204
//float opacityFactor 5208
//float Port_Input0_N008 5212
//float Port_Input1_N008 5216
//float Port_Input1_N032 5236
//float2 Port_Input1_N025 5240
//float Port_Input0_N010 5248
//float Port_Input0_N016 5252
//float Port_Input0_N017 5256
//float Port_Input0_N043 5260
//float Port_Input0_N069 5264
//float Port_Input1_N068 5268
//float Port_borderSoftness_N007 5272
//float Port_Input1_N105 5276
//float Port_Input1_N106 5280
//float Port_Input1_N122 5284
//float Port_Input1_N090 5288
//float Port_Input0_N119 5292
//float Port_Default_N117 5296
//}
//spec_const bool BLEND_MODE_AVERAGE 0 0
//spec_const bool BLEND_MODE_BRIGHT 1 0
//spec_const bool BLEND_MODE_COLOR_BURN 2 0
//spec_const bool BLEND_MODE_COLOR_DODGE 3 0
//spec_const bool BLEND_MODE_COLOR 4 0
//spec_const bool BLEND_MODE_DARKEN 5 0
//spec_const bool BLEND_MODE_DIFFERENCE 6 0
//spec_const bool BLEND_MODE_DIVIDE 7 0
//spec_const bool BLEND_MODE_DIVISION 8 0
//spec_const bool BLEND_MODE_EXCLUSION 9 0
//spec_const bool BLEND_MODE_FORGRAY 10 0
//spec_const bool BLEND_MODE_HARD_GLOW 11 0
//spec_const bool BLEND_MODE_HARD_LIGHT 12 0
//spec_const bool BLEND_MODE_HARD_MIX 13 0
//spec_const bool BLEND_MODE_HARD_PHOENIX 14 0
//spec_const bool BLEND_MODE_HARD_REFLECT 15 0
//spec_const bool BLEND_MODE_HUE 16 0
//spec_const bool BLEND_MODE_INTENSE 17 0
//spec_const bool BLEND_MODE_LIGHTEN 18 0
//spec_const bool BLEND_MODE_LINEAR_LIGHT 19 0
//spec_const bool BLEND_MODE_LUMINOSITY 20 0
//spec_const bool BLEND_MODE_NEGATION 21 0
//spec_const bool BLEND_MODE_NOTBRIGHT 22 0
//spec_const bool BLEND_MODE_OVERLAY 23 0
//spec_const bool BLEND_MODE_PIN_LIGHT 24 0
//spec_const bool BLEND_MODE_REALISTIC 25 0
//spec_const bool BLEND_MODE_SATURATION 26 0
//spec_const bool BLEND_MODE_SOFT_LIGHT 27 0
//spec_const bool BLEND_MODE_SUBTRACT 28 0
//spec_const bool BLEND_MODE_VIVID_LIGHT 29 0
//spec_const bool ENABLE_STIPPLE_PATTERN_TEST 30 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_backgroundTexture 31 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_circleTexture 32 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_intensityTexture 33 0
//spec_const bool SC_USE_UV_MIN_MAX_backgroundTexture 34 0
//spec_const bool SC_USE_UV_MIN_MAX_circleTexture 35 0
//spec_const bool SC_USE_UV_MIN_MAX_intensityTexture 36 0
//spec_const bool SC_USE_UV_TRANSFORM_backgroundTexture 37 0
//spec_const bool SC_USE_UV_TRANSFORM_circleTexture 38 0
//spec_const bool SC_USE_UV_TRANSFORM_intensityTexture 39 0
//spec_const bool UseViewSpaceDepthVariant 40 1
//spec_const bool backgroundTextureHasSwappedViews 41 0
//spec_const bool circleTextureHasSwappedViews 42 0
//spec_const bool intensityTextureHasSwappedViews 43 0
//spec_const bool sc_BlendMode_AddWithAlphaFactor 44 0
//spec_const bool sc_BlendMode_Add 45 0
//spec_const bool sc_BlendMode_AlphaTest 46 0
//spec_const bool sc_BlendMode_AlphaToCoverage 47 0
//spec_const bool sc_BlendMode_ColoredGlass 48 0
//spec_const bool sc_BlendMode_Custom 49 0
//spec_const bool sc_BlendMode_Max 50 0
//spec_const bool sc_BlendMode_Min 51 0
//spec_const bool sc_BlendMode_MultiplyOriginal 52 0
//spec_const bool sc_BlendMode_Multiply 53 0
//spec_const bool sc_BlendMode_Normal 54 0
//spec_const bool sc_BlendMode_PremultipliedAlphaAuto 55 0
//spec_const bool sc_BlendMode_PremultipliedAlphaHardware 56 0
//spec_const bool sc_BlendMode_PremultipliedAlpha 57 0
//spec_const bool sc_BlendMode_Screen 58 0
//spec_const bool sc_DepthOnly 59 0
//spec_const bool sc_FramebufferFetch 60 0
//spec_const bool sc_MotionVectorsPass 61 0
//spec_const bool sc_OITCompositingPass 62 0
//spec_const bool sc_OITDepthBoundsPass 63 0
//spec_const bool sc_OITDepthGatherPass 64 0
//spec_const bool sc_OutputBounds 65 0
//spec_const bool sc_ProjectiveShadowsCaster 66 0
//spec_const bool sc_ProjectiveShadowsReceiver 67 0
//spec_const bool sc_RenderAlphaToColor 68 0
//spec_const bool sc_ScreenTextureHasSwappedViews 69 0
//spec_const bool sc_TAAEnabled 70 0
//spec_const bool sc_VertexBlendingUseNormals 71 0
//spec_const bool sc_VertexBlending 72 0
//spec_const bool sc_Voxelization 73 0
//spec_const int SC_SOFTWARE_WRAP_MODE_U_backgroundTexture 74 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_circleTexture 75 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_intensityTexture 76 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_backgroundTexture 77 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_circleTexture 78 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_intensityTexture 79 -1
//spec_const int backgroundTextureLayout 80 0
//spec_const int circleTextureLayout 81 0
//spec_const int intensityTextureLayout 82 0
//spec_const int sc_DepthBufferMode 83 0
//spec_const int sc_RenderingSpace 84 -1
//spec_const int sc_ScreenTextureLayout 85 0
//spec_const int sc_ShaderCacheConstant 86 0
//spec_const int sc_SkinBonesCount 87 0
//spec_const int sc_StereoRenderingMode 88 0
//spec_const int sc_StereoRendering_IsClipDistanceEnabled 89 0
//SG_REFLECTION_END
constant bool BLEND_MODE_AVERAGE [[function_constant(0)]];
constant bool BLEND_MODE_AVERAGE_tmp = is_function_constant_defined(BLEND_MODE_AVERAGE) ? BLEND_MODE_AVERAGE : false;
constant bool BLEND_MODE_BRIGHT [[function_constant(1)]];
constant bool BLEND_MODE_BRIGHT_tmp = is_function_constant_defined(BLEND_MODE_BRIGHT) ? BLEND_MODE_BRIGHT : false;
constant bool BLEND_MODE_COLOR_BURN [[function_constant(2)]];
constant bool BLEND_MODE_COLOR_BURN_tmp = is_function_constant_defined(BLEND_MODE_COLOR_BURN) ? BLEND_MODE_COLOR_BURN : false;
constant bool BLEND_MODE_COLOR_DODGE [[function_constant(3)]];
constant bool BLEND_MODE_COLOR_DODGE_tmp = is_function_constant_defined(BLEND_MODE_COLOR_DODGE) ? BLEND_MODE_COLOR_DODGE : false;
constant bool BLEND_MODE_COLOR [[function_constant(4)]];
constant bool BLEND_MODE_COLOR_tmp = is_function_constant_defined(BLEND_MODE_COLOR) ? BLEND_MODE_COLOR : false;
constant bool BLEND_MODE_DARKEN [[function_constant(5)]];
constant bool BLEND_MODE_DARKEN_tmp = is_function_constant_defined(BLEND_MODE_DARKEN) ? BLEND_MODE_DARKEN : false;
constant bool BLEND_MODE_DIFFERENCE [[function_constant(6)]];
constant bool BLEND_MODE_DIFFERENCE_tmp = is_function_constant_defined(BLEND_MODE_DIFFERENCE) ? BLEND_MODE_DIFFERENCE : false;
constant bool BLEND_MODE_DIVIDE [[function_constant(7)]];
constant bool BLEND_MODE_DIVIDE_tmp = is_function_constant_defined(BLEND_MODE_DIVIDE) ? BLEND_MODE_DIVIDE : false;
constant bool BLEND_MODE_DIVISION [[function_constant(8)]];
constant bool BLEND_MODE_DIVISION_tmp = is_function_constant_defined(BLEND_MODE_DIVISION) ? BLEND_MODE_DIVISION : false;
constant bool BLEND_MODE_EXCLUSION [[function_constant(9)]];
constant bool BLEND_MODE_EXCLUSION_tmp = is_function_constant_defined(BLEND_MODE_EXCLUSION) ? BLEND_MODE_EXCLUSION : false;
constant bool BLEND_MODE_FORGRAY [[function_constant(10)]];
constant bool BLEND_MODE_FORGRAY_tmp = is_function_constant_defined(BLEND_MODE_FORGRAY) ? BLEND_MODE_FORGRAY : false;
constant bool BLEND_MODE_HARD_GLOW [[function_constant(11)]];
constant bool BLEND_MODE_HARD_GLOW_tmp = is_function_constant_defined(BLEND_MODE_HARD_GLOW) ? BLEND_MODE_HARD_GLOW : false;
constant bool BLEND_MODE_HARD_LIGHT [[function_constant(12)]];
constant bool BLEND_MODE_HARD_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_HARD_LIGHT) ? BLEND_MODE_HARD_LIGHT : false;
constant bool BLEND_MODE_HARD_MIX [[function_constant(13)]];
constant bool BLEND_MODE_HARD_MIX_tmp = is_function_constant_defined(BLEND_MODE_HARD_MIX) ? BLEND_MODE_HARD_MIX : false;
constant bool BLEND_MODE_HARD_PHOENIX [[function_constant(14)]];
constant bool BLEND_MODE_HARD_PHOENIX_tmp = is_function_constant_defined(BLEND_MODE_HARD_PHOENIX) ? BLEND_MODE_HARD_PHOENIX : false;
constant bool BLEND_MODE_HARD_REFLECT [[function_constant(15)]];
constant bool BLEND_MODE_HARD_REFLECT_tmp = is_function_constant_defined(BLEND_MODE_HARD_REFLECT) ? BLEND_MODE_HARD_REFLECT : false;
constant bool BLEND_MODE_HUE [[function_constant(16)]];
constant bool BLEND_MODE_HUE_tmp = is_function_constant_defined(BLEND_MODE_HUE) ? BLEND_MODE_HUE : false;
constant bool BLEND_MODE_INTENSE [[function_constant(17)]];
constant bool BLEND_MODE_INTENSE_tmp = is_function_constant_defined(BLEND_MODE_INTENSE) ? BLEND_MODE_INTENSE : false;
constant bool BLEND_MODE_LIGHTEN [[function_constant(18)]];
constant bool BLEND_MODE_LIGHTEN_tmp = is_function_constant_defined(BLEND_MODE_LIGHTEN) ? BLEND_MODE_LIGHTEN : false;
constant bool BLEND_MODE_LINEAR_LIGHT [[function_constant(19)]];
constant bool BLEND_MODE_LINEAR_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_LINEAR_LIGHT) ? BLEND_MODE_LINEAR_LIGHT : false;
constant bool BLEND_MODE_LUMINOSITY [[function_constant(20)]];
constant bool BLEND_MODE_LUMINOSITY_tmp = is_function_constant_defined(BLEND_MODE_LUMINOSITY) ? BLEND_MODE_LUMINOSITY : false;
constant bool BLEND_MODE_NEGATION [[function_constant(21)]];
constant bool BLEND_MODE_NEGATION_tmp = is_function_constant_defined(BLEND_MODE_NEGATION) ? BLEND_MODE_NEGATION : false;
constant bool BLEND_MODE_NOTBRIGHT [[function_constant(22)]];
constant bool BLEND_MODE_NOTBRIGHT_tmp = is_function_constant_defined(BLEND_MODE_NOTBRIGHT) ? BLEND_MODE_NOTBRIGHT : false;
constant bool BLEND_MODE_OVERLAY [[function_constant(23)]];
constant bool BLEND_MODE_OVERLAY_tmp = is_function_constant_defined(BLEND_MODE_OVERLAY) ? BLEND_MODE_OVERLAY : false;
constant bool BLEND_MODE_PIN_LIGHT [[function_constant(24)]];
constant bool BLEND_MODE_PIN_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_PIN_LIGHT) ? BLEND_MODE_PIN_LIGHT : false;
constant bool BLEND_MODE_REALISTIC [[function_constant(25)]];
constant bool BLEND_MODE_REALISTIC_tmp = is_function_constant_defined(BLEND_MODE_REALISTIC) ? BLEND_MODE_REALISTIC : false;
constant bool BLEND_MODE_SATURATION [[function_constant(26)]];
constant bool BLEND_MODE_SATURATION_tmp = is_function_constant_defined(BLEND_MODE_SATURATION) ? BLEND_MODE_SATURATION : false;
constant bool BLEND_MODE_SOFT_LIGHT [[function_constant(27)]];
constant bool BLEND_MODE_SOFT_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_SOFT_LIGHT) ? BLEND_MODE_SOFT_LIGHT : false;
constant bool BLEND_MODE_SUBTRACT [[function_constant(28)]];
constant bool BLEND_MODE_SUBTRACT_tmp = is_function_constant_defined(BLEND_MODE_SUBTRACT) ? BLEND_MODE_SUBTRACT : false;
constant bool BLEND_MODE_VIVID_LIGHT [[function_constant(29)]];
constant bool BLEND_MODE_VIVID_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_VIVID_LIGHT) ? BLEND_MODE_VIVID_LIGHT : false;
constant bool ENABLE_STIPPLE_PATTERN_TEST [[function_constant(30)]];
constant bool ENABLE_STIPPLE_PATTERN_TEST_tmp = is_function_constant_defined(ENABLE_STIPPLE_PATTERN_TEST) ? ENABLE_STIPPLE_PATTERN_TEST : false;
constant bool SC_USE_CLAMP_TO_BORDER_backgroundTexture [[function_constant(31)]];
constant bool SC_USE_CLAMP_TO_BORDER_backgroundTexture_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_backgroundTexture) ? SC_USE_CLAMP_TO_BORDER_backgroundTexture : false;
constant bool SC_USE_CLAMP_TO_BORDER_circleTexture [[function_constant(32)]];
constant bool SC_USE_CLAMP_TO_BORDER_circleTexture_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_circleTexture) ? SC_USE_CLAMP_TO_BORDER_circleTexture : false;
constant bool SC_USE_CLAMP_TO_BORDER_intensityTexture [[function_constant(33)]];
constant bool SC_USE_CLAMP_TO_BORDER_intensityTexture_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_intensityTexture) ? SC_USE_CLAMP_TO_BORDER_intensityTexture : false;
constant bool SC_USE_UV_MIN_MAX_backgroundTexture [[function_constant(34)]];
constant bool SC_USE_UV_MIN_MAX_backgroundTexture_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_backgroundTexture) ? SC_USE_UV_MIN_MAX_backgroundTexture : false;
constant bool SC_USE_UV_MIN_MAX_circleTexture [[function_constant(35)]];
constant bool SC_USE_UV_MIN_MAX_circleTexture_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_circleTexture) ? SC_USE_UV_MIN_MAX_circleTexture : false;
constant bool SC_USE_UV_MIN_MAX_intensityTexture [[function_constant(36)]];
constant bool SC_USE_UV_MIN_MAX_intensityTexture_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_intensityTexture) ? SC_USE_UV_MIN_MAX_intensityTexture : false;
constant bool SC_USE_UV_TRANSFORM_backgroundTexture [[function_constant(37)]];
constant bool SC_USE_UV_TRANSFORM_backgroundTexture_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_backgroundTexture) ? SC_USE_UV_TRANSFORM_backgroundTexture : false;
constant bool SC_USE_UV_TRANSFORM_circleTexture [[function_constant(38)]];
constant bool SC_USE_UV_TRANSFORM_circleTexture_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_circleTexture) ? SC_USE_UV_TRANSFORM_circleTexture : false;
constant bool SC_USE_UV_TRANSFORM_intensityTexture [[function_constant(39)]];
constant bool SC_USE_UV_TRANSFORM_intensityTexture_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_intensityTexture) ? SC_USE_UV_TRANSFORM_intensityTexture : false;
constant bool UseViewSpaceDepthVariant [[function_constant(40)]];
constant bool UseViewSpaceDepthVariant_tmp = is_function_constant_defined(UseViewSpaceDepthVariant) ? UseViewSpaceDepthVariant : true;
constant bool backgroundTextureHasSwappedViews [[function_constant(41)]];
constant bool backgroundTextureHasSwappedViews_tmp = is_function_constant_defined(backgroundTextureHasSwappedViews) ? backgroundTextureHasSwappedViews : false;
constant bool circleTextureHasSwappedViews [[function_constant(42)]];
constant bool circleTextureHasSwappedViews_tmp = is_function_constant_defined(circleTextureHasSwappedViews) ? circleTextureHasSwappedViews : false;
constant bool intensityTextureHasSwappedViews [[function_constant(43)]];
constant bool intensityTextureHasSwappedViews_tmp = is_function_constant_defined(intensityTextureHasSwappedViews) ? intensityTextureHasSwappedViews : false;
constant bool sc_BlendMode_AddWithAlphaFactor [[function_constant(44)]];
constant bool sc_BlendMode_AddWithAlphaFactor_tmp = is_function_constant_defined(sc_BlendMode_AddWithAlphaFactor) ? sc_BlendMode_AddWithAlphaFactor : false;
constant bool sc_BlendMode_Add [[function_constant(45)]];
constant bool sc_BlendMode_Add_tmp = is_function_constant_defined(sc_BlendMode_Add) ? sc_BlendMode_Add : false;
constant bool sc_BlendMode_AlphaTest [[function_constant(46)]];
constant bool sc_BlendMode_AlphaTest_tmp = is_function_constant_defined(sc_BlendMode_AlphaTest) ? sc_BlendMode_AlphaTest : false;
constant bool sc_BlendMode_AlphaToCoverage [[function_constant(47)]];
constant bool sc_BlendMode_AlphaToCoverage_tmp = is_function_constant_defined(sc_BlendMode_AlphaToCoverage) ? sc_BlendMode_AlphaToCoverage : false;
constant bool sc_BlendMode_ColoredGlass [[function_constant(48)]];
constant bool sc_BlendMode_ColoredGlass_tmp = is_function_constant_defined(sc_BlendMode_ColoredGlass) ? sc_BlendMode_ColoredGlass : false;
constant bool sc_BlendMode_Custom [[function_constant(49)]];
constant bool sc_BlendMode_Custom_tmp = is_function_constant_defined(sc_BlendMode_Custom) ? sc_BlendMode_Custom : false;
constant bool sc_BlendMode_Max [[function_constant(50)]];
constant bool sc_BlendMode_Max_tmp = is_function_constant_defined(sc_BlendMode_Max) ? sc_BlendMode_Max : false;
constant bool sc_BlendMode_Min [[function_constant(51)]];
constant bool sc_BlendMode_Min_tmp = is_function_constant_defined(sc_BlendMode_Min) ? sc_BlendMode_Min : false;
constant bool sc_BlendMode_MultiplyOriginal [[function_constant(52)]];
constant bool sc_BlendMode_MultiplyOriginal_tmp = is_function_constant_defined(sc_BlendMode_MultiplyOriginal) ? sc_BlendMode_MultiplyOriginal : false;
constant bool sc_BlendMode_Multiply [[function_constant(53)]];
constant bool sc_BlendMode_Multiply_tmp = is_function_constant_defined(sc_BlendMode_Multiply) ? sc_BlendMode_Multiply : false;
constant bool sc_BlendMode_Normal [[function_constant(54)]];
constant bool sc_BlendMode_Normal_tmp = is_function_constant_defined(sc_BlendMode_Normal) ? sc_BlendMode_Normal : false;
constant bool sc_BlendMode_PremultipliedAlphaAuto [[function_constant(55)]];
constant bool sc_BlendMode_PremultipliedAlphaAuto_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlphaAuto) ? sc_BlendMode_PremultipliedAlphaAuto : false;
constant bool sc_BlendMode_PremultipliedAlphaHardware [[function_constant(56)]];
constant bool sc_BlendMode_PremultipliedAlphaHardware_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlphaHardware) ? sc_BlendMode_PremultipliedAlphaHardware : false;
constant bool sc_BlendMode_PremultipliedAlpha [[function_constant(57)]];
constant bool sc_BlendMode_PremultipliedAlpha_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlpha) ? sc_BlendMode_PremultipliedAlpha : false;
constant bool sc_BlendMode_Screen [[function_constant(58)]];
constant bool sc_BlendMode_Screen_tmp = is_function_constant_defined(sc_BlendMode_Screen) ? sc_BlendMode_Screen : false;
constant bool sc_DepthOnly [[function_constant(59)]];
constant bool sc_DepthOnly_tmp = is_function_constant_defined(sc_DepthOnly) ? sc_DepthOnly : false;
constant bool sc_FramebufferFetch [[function_constant(60)]];
constant bool sc_FramebufferFetch_tmp = is_function_constant_defined(sc_FramebufferFetch) ? sc_FramebufferFetch : false;
constant bool sc_MotionVectorsPass [[function_constant(61)]];
constant bool sc_MotionVectorsPass_tmp = is_function_constant_defined(sc_MotionVectorsPass) ? sc_MotionVectorsPass : false;
constant bool sc_OITCompositingPass [[function_constant(62)]];
constant bool sc_OITCompositingPass_tmp = is_function_constant_defined(sc_OITCompositingPass) ? sc_OITCompositingPass : false;
constant bool sc_OITDepthBoundsPass [[function_constant(63)]];
constant bool sc_OITDepthBoundsPass_tmp = is_function_constant_defined(sc_OITDepthBoundsPass) ? sc_OITDepthBoundsPass : false;
constant bool sc_OITDepthGatherPass [[function_constant(64)]];
constant bool sc_OITDepthGatherPass_tmp = is_function_constant_defined(sc_OITDepthGatherPass) ? sc_OITDepthGatherPass : false;
constant bool sc_OutputBounds [[function_constant(65)]];
constant bool sc_OutputBounds_tmp = is_function_constant_defined(sc_OutputBounds) ? sc_OutputBounds : false;
constant bool sc_ProjectiveShadowsCaster [[function_constant(66)]];
constant bool sc_ProjectiveShadowsCaster_tmp = is_function_constant_defined(sc_ProjectiveShadowsCaster) ? sc_ProjectiveShadowsCaster : false;
constant bool sc_ProjectiveShadowsReceiver [[function_constant(67)]];
constant bool sc_ProjectiveShadowsReceiver_tmp = is_function_constant_defined(sc_ProjectiveShadowsReceiver) ? sc_ProjectiveShadowsReceiver : false;
constant bool sc_RenderAlphaToColor [[function_constant(68)]];
constant bool sc_RenderAlphaToColor_tmp = is_function_constant_defined(sc_RenderAlphaToColor) ? sc_RenderAlphaToColor : false;
constant bool sc_ScreenTextureHasSwappedViews [[function_constant(69)]];
constant bool sc_ScreenTextureHasSwappedViews_tmp = is_function_constant_defined(sc_ScreenTextureHasSwappedViews) ? sc_ScreenTextureHasSwappedViews : false;
constant bool sc_TAAEnabled [[function_constant(70)]];
constant bool sc_TAAEnabled_tmp = is_function_constant_defined(sc_TAAEnabled) ? sc_TAAEnabled : false;
constant bool sc_VertexBlendingUseNormals [[function_constant(71)]];
constant bool sc_VertexBlendingUseNormals_tmp = is_function_constant_defined(sc_VertexBlendingUseNormals) ? sc_VertexBlendingUseNormals : false;
constant bool sc_VertexBlending [[function_constant(72)]];
constant bool sc_VertexBlending_tmp = is_function_constant_defined(sc_VertexBlending) ? sc_VertexBlending : false;
constant bool sc_Voxelization [[function_constant(73)]];
constant bool sc_Voxelization_tmp = is_function_constant_defined(sc_Voxelization) ? sc_Voxelization : false;
constant int SC_SOFTWARE_WRAP_MODE_U_backgroundTexture [[function_constant(74)]];
constant int SC_SOFTWARE_WRAP_MODE_U_backgroundTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_backgroundTexture) ? SC_SOFTWARE_WRAP_MODE_U_backgroundTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_U_circleTexture [[function_constant(75)]];
constant int SC_SOFTWARE_WRAP_MODE_U_circleTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_circleTexture) ? SC_SOFTWARE_WRAP_MODE_U_circleTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_U_intensityTexture [[function_constant(76)]];
constant int SC_SOFTWARE_WRAP_MODE_U_intensityTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_intensityTexture) ? SC_SOFTWARE_WRAP_MODE_U_intensityTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_backgroundTexture [[function_constant(77)]];
constant int SC_SOFTWARE_WRAP_MODE_V_backgroundTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_backgroundTexture) ? SC_SOFTWARE_WRAP_MODE_V_backgroundTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_circleTexture [[function_constant(78)]];
constant int SC_SOFTWARE_WRAP_MODE_V_circleTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_circleTexture) ? SC_SOFTWARE_WRAP_MODE_V_circleTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_intensityTexture [[function_constant(79)]];
constant int SC_SOFTWARE_WRAP_MODE_V_intensityTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_intensityTexture) ? SC_SOFTWARE_WRAP_MODE_V_intensityTexture : -1;
constant int backgroundTextureLayout [[function_constant(80)]];
constant int backgroundTextureLayout_tmp = is_function_constant_defined(backgroundTextureLayout) ? backgroundTextureLayout : 0;
constant int circleTextureLayout [[function_constant(81)]];
constant int circleTextureLayout_tmp = is_function_constant_defined(circleTextureLayout) ? circleTextureLayout : 0;
constant int intensityTextureLayout [[function_constant(82)]];
constant int intensityTextureLayout_tmp = is_function_constant_defined(intensityTextureLayout) ? intensityTextureLayout : 0;
constant int sc_DepthBufferMode [[function_constant(83)]];
constant int sc_DepthBufferMode_tmp = is_function_constant_defined(sc_DepthBufferMode) ? sc_DepthBufferMode : 0;
constant int sc_RenderingSpace [[function_constant(84)]];
constant int sc_RenderingSpace_tmp = is_function_constant_defined(sc_RenderingSpace) ? sc_RenderingSpace : -1;
constant int sc_ScreenTextureLayout [[function_constant(85)]];
constant int sc_ScreenTextureLayout_tmp = is_function_constant_defined(sc_ScreenTextureLayout) ? sc_ScreenTextureLayout : 0;
constant int sc_ShaderCacheConstant [[function_constant(86)]];
constant int sc_ShaderCacheConstant_tmp = is_function_constant_defined(sc_ShaderCacheConstant) ? sc_ShaderCacheConstant : 0;
constant int sc_SkinBonesCount [[function_constant(87)]];
constant int sc_SkinBonesCount_tmp = is_function_constant_defined(sc_SkinBonesCount) ? sc_SkinBonesCount : 0;
constant int sc_StereoRenderingMode [[function_constant(88)]];
constant int sc_StereoRenderingMode_tmp = is_function_constant_defined(sc_StereoRenderingMode) ? sc_StereoRenderingMode : 0;
constant int sc_StereoRendering_IsClipDistanceEnabled [[function_constant(89)]];
constant int sc_StereoRendering_IsClipDistanceEnabled_tmp = is_function_constant_defined(sc_StereoRendering_IsClipDistanceEnabled) ? sc_StereoRendering_IsClipDistanceEnabled : 0;

namespace SNAP_VS {
struct sc_Vertex_t
{
float4 position;
float3 normal;
float3 tangent;
float2 texture0;
float2 texture1;
};
struct ssGlobals
{
float gTimeElapsed;
float gTimeDelta;
float gTimeElapsedShifted;
float4 VertexColor;
float3 SurfacePosition_ObjectSpace;
};
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float shaderComplexityValue;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
float4 voxelization_params_0;
float4 voxelization_params_frustum_lrbt;
float4 voxelization_params_frustum_nf;
float3 voxelization_params_camera_pos;
float4x4 sc_ModelMatrixVoxelization;
float correctedIntensity;
float4 intensityTextureSize;
float4 intensityTextureDims;
float4 intensityTextureView;
float3x3 intensityTextureTransform;
float4 intensityTextureUvMinMax;
float4 intensityTextureBorderColor;
float reflBlurWidth;
float reflBlurMinRough;
float reflBlurMaxRough;
int overrideTimeEnabled;
float overrideTimeElapsed[32];
float overrideTimeDelta;
int PreviewEnabled;
int PreviewNodeID;
float alphaTestThreshold;
float2 size;
float cornerRadius;
float4 backgroundTextureSize;
float4 backgroundTextureDims;
float4 backgroundTextureView;
float3x3 backgroundTextureTransform;
float4 backgroundTextureUvMinMax;
float4 backgroundTextureBorderColor;
float useTexture;
float2 textureMode;
float textureWrap;
float4 backgroundColor;
float4 colors[6];
float percents[6];
int stops;
float linearGradientStart;
float linearGradientEnd;
float linearGradientAngle;
float linearGradientLength;
float2 gradientStartPosition;
float radialGradientLength;
float border;
float borderSize;
float gradientType;
float4 highlightColorStop2;
float4 highlightColorStop1;
float highlightStop1;
float highlightStop2;
float2 cursorPosition;
float highlightSize;
float4 highlightActiveColorStop2;
float4 highlightActiveColorStop1;
float isActive;
float isHovered;
float4 circleTextureSize;
float4 circleTextureDims;
float4 circleTextureView;
float3x3 circleTextureTransform;
float4 circleTextureUvMinMax;
float4 circleTextureBorderColor;
int borderOnly;
int cutOutCenter;
float frameBorder;
float4 grabZones[8];
float grabZonesCount;
float dotsHighlightStop1;
float dotsHighlightStop2;
float dotsScalar;
float4 borderColor;
float4 borderGradientColors[6];
float borderGradientPercents[6];
int borderGradientStops;
float borderLinearGradientStart;
float borderLinearGradientEnd;
float borderLinearGradientAngle;
float borderLinearGradientLength;
float2 borderGradientStartPosition;
float borderRadialGradientLength;
float borderGradientType;
float edgeHighlightStop1;
float edgeHighlightStop2;
float opacityFactor;
float Port_Input0_N008;
float Port_Input1_N008;
float2 Port_Import_N023;
float Port_Import_N024;
float Port_Input1_N032;
float2 Port_Input1_N025;
float Port_Input0_N010;
float Port_Input0_N016;
float Port_Input0_N017;
float Port_Input0_N043;
float Port_Input0_N069;
float Port_Input1_N068;
float Port_borderSoftness_N007;
float Port_Input1_N105;
float Port_Input1_N106;
float Port_Input1_N122;
float Port_Input1_N090;
float Port_Input0_N119;
float Port_Default_N117;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct ssPreviewInfo
{
float4 Color;
bool Saved;
};
struct sc_Set0
{
constant sc_Bones_obj* sc_BonesUBO [[id(0)]];
texture2d<float> backgroundTexture [[id(1)]];
texture2d<float> circleTexture [[id(2)]];
texture2d<float> intensityTexture [[id(3)]];
texture2d<float> sc_ScreenTexture [[id(15)]];
sampler backgroundTextureSmpSC [[id(18)]];
sampler circleTextureSmpSC [[id(19)]];
sampler intensityTextureSmpSC [[id(20)]];
sampler sc_ScreenTextureSmpSC [[id(25)]];
constant userUniformsObj* UserUniforms [[id(28)]];
};
struct main_vert_out
{
float4 varPosAndMotion [[user(locn0)]];
float4 varNormalAndMotion [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varTex01 [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
float4 varColor [[user(locn10)]];
float4 PreviewVertexColor [[user(locn11)]];
float PreviewVertexSaved [[user(locn12)]];
float4 gl_Position [[position]];
};
struct main_vert_in
{
float4 position [[attribute(0)]];
float3 normal [[attribute(1)]];
float4 tangent [[attribute(2)]];
float2 texture0 [[attribute(3)]];
float2 texture1 [[attribute(4)]];
float4 boneData [[attribute(5)]];
float3 blendShape0Pos [[attribute(6)]];
float3 blendShape1Pos [[attribute(7)]];
float3 blendShape2Pos [[attribute(8)]];
float3 blendShape3Pos [[attribute(9)]];
float3 blendShape4Pos [[attribute(10)]];
float3 blendShape5Pos [[attribute(11)]];
float3 blendShape0Normal [[attribute(12)]];
float3 blendShape1Normal [[attribute(13)]];
float3 blendShape2Normal [[attribute(14)]];
float3 positionNext [[attribute(15)]];
float3 positionPrevious [[attribute(16)]];
float4 strandProperties [[attribute(17)]];
float4 color [[attribute(18)]];
};
vertex main_vert_out main_vert(main_vert_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]],uint gl_InstanceIndex [[instance_id]])
{
main_vert_out out={};
out.PreviewVertexColor=float4(0.5);
ssPreviewInfo PreviewInfo;
PreviewInfo.Color=float4(0.5);
PreviewInfo.Saved=false;
out.PreviewVertexSaved=0.0;
sc_Vertex_t l9_0;
l9_0.position=in.position;
l9_0.normal=in.normal;
l9_0.tangent=in.tangent.xyz;
l9_0.texture0=in.texture0;
l9_0.texture1=in.texture1;
sc_Vertex_t l9_1=l9_0;
sc_Vertex_t param=l9_1;
if ((int(sc_Voxelization_tmp)!=0))
{
sc_Vertex_t l9_2=param;
param=l9_2;
}
sc_Vertex_t l9_3=param;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_4=l9_3;
float3 l9_5=in.blendShape0Pos;
float3 l9_6=in.blendShape0Normal;
float l9_7=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_8=l9_4;
float3 l9_9=l9_5;
float l9_10=l9_7;
float3 l9_11=l9_8.position.xyz+(l9_9*l9_10);
l9_8.position=float4(l9_11.x,l9_11.y,l9_11.z,l9_8.position.w);
l9_4=l9_8;
l9_4.normal+=(l9_6*l9_7);
l9_3=l9_4;
sc_Vertex_t l9_12=l9_3;
float3 l9_13=in.blendShape1Pos;
float3 l9_14=in.blendShape1Normal;
float l9_15=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_16=l9_12;
float3 l9_17=l9_13;
float l9_18=l9_15;
float3 l9_19=l9_16.position.xyz+(l9_17*l9_18);
l9_16.position=float4(l9_19.x,l9_19.y,l9_19.z,l9_16.position.w);
l9_12=l9_16;
l9_12.normal+=(l9_14*l9_15);
l9_3=l9_12;
sc_Vertex_t l9_20=l9_3;
float3 l9_21=in.blendShape2Pos;
float3 l9_22=in.blendShape2Normal;
float l9_23=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_24=l9_20;
float3 l9_25=l9_21;
float l9_26=l9_23;
float3 l9_27=l9_24.position.xyz+(l9_25*l9_26);
l9_24.position=float4(l9_27.x,l9_27.y,l9_27.z,l9_24.position.w);
l9_20=l9_24;
l9_20.normal+=(l9_22*l9_23);
l9_3=l9_20;
}
else
{
sc_Vertex_t l9_28=l9_3;
float3 l9_29=in.blendShape0Pos;
float l9_30=(*sc_set0.UserUniforms).weights0.x;
float3 l9_31=l9_28.position.xyz+(l9_29*l9_30);
l9_28.position=float4(l9_31.x,l9_31.y,l9_31.z,l9_28.position.w);
l9_3=l9_28;
sc_Vertex_t l9_32=l9_3;
float3 l9_33=in.blendShape1Pos;
float l9_34=(*sc_set0.UserUniforms).weights0.y;
float3 l9_35=l9_32.position.xyz+(l9_33*l9_34);
l9_32.position=float4(l9_35.x,l9_35.y,l9_35.z,l9_32.position.w);
l9_3=l9_32;
sc_Vertex_t l9_36=l9_3;
float3 l9_37=in.blendShape2Pos;
float l9_38=(*sc_set0.UserUniforms).weights0.z;
float3 l9_39=l9_36.position.xyz+(l9_37*l9_38);
l9_36.position=float4(l9_39.x,l9_39.y,l9_39.z,l9_36.position.w);
l9_3=l9_36;
sc_Vertex_t l9_40=l9_3;
float3 l9_41=in.blendShape3Pos;
float l9_42=(*sc_set0.UserUniforms).weights0.w;
float3 l9_43=l9_40.position.xyz+(l9_41*l9_42);
l9_40.position=float4(l9_43.x,l9_43.y,l9_43.z,l9_40.position.w);
l9_3=l9_40;
sc_Vertex_t l9_44=l9_3;
float3 l9_45=in.blendShape4Pos;
float l9_46=(*sc_set0.UserUniforms).weights1.x;
float3 l9_47=l9_44.position.xyz+(l9_45*l9_46);
l9_44.position=float4(l9_47.x,l9_47.y,l9_47.z,l9_44.position.w);
l9_3=l9_44;
sc_Vertex_t l9_48=l9_3;
float3 l9_49=in.blendShape5Pos;
float l9_50=(*sc_set0.UserUniforms).weights1.y;
float3 l9_51=l9_48.position.xyz+(l9_49*l9_50);
l9_48.position=float4(l9_51.x,l9_51.y,l9_51.z,l9_48.position.w);
l9_3=l9_48;
}
}
param=l9_3;
sc_Vertex_t l9_52=param;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_53=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_53=float4(1.0,fract(in.boneData.yzw));
l9_53.x-=dot(l9_53.yzw,float3(1.0));
}
float4 l9_54=l9_53;
float4 l9_55=l9_54;
int l9_56=int(in.boneData.x);
int l9_57=int(in.boneData.y);
int l9_58=int(in.boneData.z);
int l9_59=int(in.boneData.w);
int l9_60=l9_56;
float4 l9_61=l9_52.position;
float3 l9_62=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_63=l9_60;
float4 l9_64=(*sc_set0.sc_BonesUBO).sc_Bones[l9_63].boneMatrix[0];
float4 l9_65=(*sc_set0.sc_BonesUBO).sc_Bones[l9_63].boneMatrix[1];
float4 l9_66=(*sc_set0.sc_BonesUBO).sc_Bones[l9_63].boneMatrix[2];
float4 l9_67[3];
l9_67[0]=l9_64;
l9_67[1]=l9_65;
l9_67[2]=l9_66;
l9_62=float3(dot(l9_61,l9_67[0]),dot(l9_61,l9_67[1]),dot(l9_61,l9_67[2]));
}
else
{
l9_62=l9_61.xyz;
}
float3 l9_68=l9_62;
float3 l9_69=l9_68;
float l9_70=l9_55.x;
int l9_71=l9_57;
float4 l9_72=l9_52.position;
float3 l9_73=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_74=l9_71;
float4 l9_75=(*sc_set0.sc_BonesUBO).sc_Bones[l9_74].boneMatrix[0];
float4 l9_76=(*sc_set0.sc_BonesUBO).sc_Bones[l9_74].boneMatrix[1];
float4 l9_77=(*sc_set0.sc_BonesUBO).sc_Bones[l9_74].boneMatrix[2];
float4 l9_78[3];
l9_78[0]=l9_75;
l9_78[1]=l9_76;
l9_78[2]=l9_77;
l9_73=float3(dot(l9_72,l9_78[0]),dot(l9_72,l9_78[1]),dot(l9_72,l9_78[2]));
}
else
{
l9_73=l9_72.xyz;
}
float3 l9_79=l9_73;
float3 l9_80=l9_79;
float l9_81=l9_55.y;
int l9_82=l9_58;
float4 l9_83=l9_52.position;
float3 l9_84=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_85=l9_82;
float4 l9_86=(*sc_set0.sc_BonesUBO).sc_Bones[l9_85].boneMatrix[0];
float4 l9_87=(*sc_set0.sc_BonesUBO).sc_Bones[l9_85].boneMatrix[1];
float4 l9_88=(*sc_set0.sc_BonesUBO).sc_Bones[l9_85].boneMatrix[2];
float4 l9_89[3];
l9_89[0]=l9_86;
l9_89[1]=l9_87;
l9_89[2]=l9_88;
l9_84=float3(dot(l9_83,l9_89[0]),dot(l9_83,l9_89[1]),dot(l9_83,l9_89[2]));
}
else
{
l9_84=l9_83.xyz;
}
float3 l9_90=l9_84;
float3 l9_91=l9_90;
float l9_92=l9_55.z;
int l9_93=l9_59;
float4 l9_94=l9_52.position;
float3 l9_95=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_96=l9_93;
float4 l9_97=(*sc_set0.sc_BonesUBO).sc_Bones[l9_96].boneMatrix[0];
float4 l9_98=(*sc_set0.sc_BonesUBO).sc_Bones[l9_96].boneMatrix[1];
float4 l9_99=(*sc_set0.sc_BonesUBO).sc_Bones[l9_96].boneMatrix[2];
float4 l9_100[3];
l9_100[0]=l9_97;
l9_100[1]=l9_98;
l9_100[2]=l9_99;
l9_95=float3(dot(l9_94,l9_100[0]),dot(l9_94,l9_100[1]),dot(l9_94,l9_100[2]));
}
else
{
l9_95=l9_94.xyz;
}
float3 l9_101=l9_95;
float3 l9_102=(((l9_69*l9_70)+(l9_80*l9_81))+(l9_91*l9_92))+(l9_101*l9_55.w);
l9_52.position=float4(l9_102.x,l9_102.y,l9_102.z,l9_52.position.w);
int l9_103=l9_56;
float3x3 l9_104=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_103].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_103].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_103].normalMatrix[2].xyz));
float3x3 l9_105=l9_104;
float3x3 l9_106=l9_105;
int l9_107=l9_57;
float3x3 l9_108=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_107].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_107].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_107].normalMatrix[2].xyz));
float3x3 l9_109=l9_108;
float3x3 l9_110=l9_109;
int l9_111=l9_58;
float3x3 l9_112=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_111].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_111].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_111].normalMatrix[2].xyz));
float3x3 l9_113=l9_112;
float3x3 l9_114=l9_113;
int l9_115=l9_59;
float3x3 l9_116=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_115].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_115].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_115].normalMatrix[2].xyz));
float3x3 l9_117=l9_116;
float3x3 l9_118=l9_117;
l9_52.normal=((((l9_106*l9_52.normal)*l9_55.x)+((l9_110*l9_52.normal)*l9_55.y))+((l9_114*l9_52.normal)*l9_55.z))+((l9_118*l9_52.normal)*l9_55.w);
l9_52.tangent=((((l9_106*l9_52.tangent)*l9_55.x)+((l9_110*l9_52.tangent)*l9_55.y))+((l9_114*l9_52.tangent)*l9_55.z))+((l9_118*l9_52.tangent)*l9_55.w);
}
param=l9_52;
if (sc_RenderingSpace_tmp==3)
{
out.varPosAndMotion=float4(float3(0.0).x,float3(0.0).y,float3(0.0).z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param.normal.x,param.normal.y,param.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param.tangent.x,param.tangent.y,param.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==4)
{
out.varPosAndMotion=float4(float3(0.0).x,float3(0.0).y,float3(0.0).z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param.normal.x,param.normal.y,param.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param.tangent.x,param.tangent.y,param.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
out.varPosAndMotion=float4(param.position.xyz.x,param.position.xyz.y,param.position.xyz.z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param.normal.x,param.normal.y,param.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param.tangent.x,param.tangent.y,param.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
float3 l9_119=((*sc_set0.UserUniforms).sc_ModelMatrix*param.position).xyz;
out.varPosAndMotion=float4(l9_119.x,l9_119.y,l9_119.z,out.varPosAndMotion.w);
float3 l9_120=(*sc_set0.UserUniforms).sc_NormalMatrix*param.normal;
out.varNormalAndMotion=float4(l9_120.x,l9_120.y,l9_120.z,out.varNormalAndMotion.w);
float3 l9_121=(*sc_set0.UserUniforms).sc_NormalMatrix*param.tangent;
out.varTangent=float4(l9_121.x,l9_121.y,l9_121.z,out.varTangent.w);
}
}
}
}
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
param.texture0.x=1.0-param.texture0.x;
}
out.varColor=in.color;
sc_Vertex_t v=param;
ssGlobals Globals;
Globals.gTimeElapsed=(*sc_set0.UserUniforms).sc_Time.x;
Globals.gTimeDelta=(*sc_set0.UserUniforms).sc_Time.y;
Globals.VertexColor=out.varColor;
Globals.SurfacePosition_ObjectSpace=((*sc_set0.UserUniforms).sc_ModelMatrixInverse*float4(out.varPosAndMotion.xyz,1.0)).xyz;
float3 WorldPosition=out.varPosAndMotion.xyz;
float3 WorldNormal=out.varNormalAndMotion.xyz;
float3 WorldTangent=out.varTangent.xyz;
float4 Color_N0=float4(0.0);
Color_N0=Globals.VertexColor;
float Value1_N1=0.0;
float Value3_N1=0.0;
float4 param_1=Color_N0;
float param_2=param_1.x;
float param_3=param_1.z;
Value1_N1=param_2;
Value3_N1=param_3;
float Output_N8=0.0;
Output_N8=smoothstep((*sc_set0.UserUniforms).Port_Input0_N008,(*sc_set0.UserUniforms).Port_Input1_N008,Value3_N1);
float2 Output_N36=float2(0.0);
float2 param_4=(*sc_set0.UserUniforms).size;
Output_N36=param_4;
float2 Value_N23=float2(0.0);
Value_N23=Output_N36;
float Value1_N37=0.0;
float Value2_N37=0.0;
float2 param_5=Value_N23;
float param_6=param_5.x;
float param_7=param_5.y;
Value1_N37=param_6;
Value2_N37=param_7;
float2 Value_N14=float2(0.0);
Value_N14.x=Value1_N37;
Value_N14.y=Value2_N37;
float Output_N33=0.0;
float param_8=(*sc_set0.UserUniforms).cornerRadius;
Output_N33=param_8;
float Value_N24=0.0;
Value_N24=Output_N33;
float Output_N35=0.0;
Output_N35=Value_N24-1.0;
float Output_N32=0.0;
Output_N32=Output_N35*(*sc_set0.UserUniforms).Port_Input1_N032;
float2 Output_N34=float2(0.0);
Output_N34=Value_N14-float2(Output_N32);
float Value1_N15=0.0;
float Value2_N15=0.0;
float2 param_9=Output_N34;
float param_10=param_9.x;
float param_11=param_9.y;
Value1_N15=param_10;
Value2_N15=param_11;
float Output_N11=0.0;
Output_N11=Output_N8*Value1_N15;
float3 Position_N2=float3(0.0);
Position_N2=Globals.SurfacePosition_ObjectSpace;
float2 Value1_N30=float2(0.0);
float Value2_N30=0.0;
float3 param_12=Position_N2;
float2 param_13=param_12.xy;
float param_14=param_12.z;
Value1_N30=param_13;
Value2_N30=param_14;
float2 Output_N20=float2(0.0);
Output_N20=Value1_N30*float2(Value_N24);
float2 Output_N25=float2(0.0);
Output_N25=Output_N34*(*sc_set0.UserUniforms).Port_Input1_N025;
float2 Output_N27=float2(0.0);
Output_N27=Output_N20-Output_N25;
float3 Value_N29=float3(0.0);
Value_N29=float3(Output_N27.x,Output_N27.y,Value_N29.z);
Value_N29.z=Value2_N30;
float Value1_N3=0.0;
float Value2_N3=0.0;
float Value3_N3=0.0;
float3 param_15=Value_N29;
float param_16=param_15.x;
float param_17=param_15.y;
float param_18=param_15.z;
Value1_N3=param_16;
Value2_N3=param_17;
Value3_N3=param_18;
float Output_N12=0.0;
Output_N12=Output_N11+Value1_N3;
float Output_N10=0.0;
Output_N10=step((*sc_set0.UserUniforms).Port_Input0_N010,Value1_N1);
float Output_N6=0.0;
Output_N6=Output_N10*Value2_N15;
float Output_N9=0.0;
Output_N9=Output_N6+Value2_N3;
float3 Value_N5=float3(0.0);
Value_N5.x=Output_N12;
Value_N5.y=Output_N9;
Value_N5.z=Value3_N3;
float3 VectorOut_N28=float3(0.0);
VectorOut_N28=((*sc_set0.UserUniforms).sc_ModelMatrix*float4(Value_N5,1.0)).xyz;
float3 Export_N39=float3(0.0);
Export_N39=VectorOut_N28;
WorldPosition=Export_N39;
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
WorldPosition=out.varPosAndMotion.xyz;
WorldNormal=out.varNormalAndMotion.xyz;
WorldTangent=out.varTangent.xyz;
}
sc_Vertex_t param_19=v;
float3 param_20=WorldPosition;
float3 param_21=WorldNormal;
float3 param_22=WorldTangent;
float4 param_23=v.position;
out.varPosAndMotion=float4(param_20.x,param_20.y,param_20.z,out.varPosAndMotion.w);
float3 l9_122=normalize(param_21);
out.varNormalAndMotion=float4(l9_122.x,l9_122.y,l9_122.z,out.varNormalAndMotion.w);
float3 l9_123=normalize(param_22);
out.varTangent=float4(l9_123.x,l9_123.y,l9_123.z,out.varTangent.w);
out.varTangent.w=in.tangent.w;
if ((int(UseViewSpaceDepthVariant_tmp)!=0)&&(((int(sc_OITDepthGatherPass_tmp)!=0)||(int(sc_OITCompositingPass_tmp)!=0))||(int(sc_OITDepthBoundsPass_tmp)!=0)))
{
float4 l9_124=param_19.position;
float4 l9_125=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
int l9_126=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_126=0;
}
else
{
l9_126=gl_InstanceIndex%2;
}
int l9_127=l9_126;
l9_125=(*sc_set0.UserUniforms).sc_ProjectionMatrixInverseArray[l9_127]*l9_124;
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_128=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_128=0;
}
else
{
l9_128=gl_InstanceIndex%2;
}
int l9_129=l9_128;
l9_125=(*sc_set0.UserUniforms).sc_ViewMatrixArray[l9_129]*l9_124;
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_130=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_130=0;
}
else
{
l9_130=gl_InstanceIndex%2;
}
int l9_131=l9_130;
l9_125=(*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_131]*l9_124;
}
else
{
l9_125=l9_124;
}
}
}
float4 l9_132=l9_125;
out.varViewSpaceDepth=-l9_132.z;
}
float4 l9_133=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
l9_133=param_23;
}
else
{
if (sc_RenderingSpace_tmp==4)
{
int l9_134=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_134=0;
}
else
{
l9_134=gl_InstanceIndex%2;
}
int l9_135=l9_134;
l9_133=((*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_135]*param_19.position)*float4(1.0/(*sc_set0.UserUniforms).sc_Camera.aspect,1.0,1.0,1.0);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_136=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_136=0;
}
else
{
l9_136=gl_InstanceIndex%2;
}
int l9_137=l9_136;
l9_133=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_137]*float4(out.varPosAndMotion.xyz,1.0);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_138=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_138=0;
}
else
{
l9_138=gl_InstanceIndex%2;
}
int l9_139=l9_138;
l9_133=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_139]*float4(out.varPosAndMotion.xyz,1.0);
}
}
}
}
out.varTex01=float4(param_19.texture0,param_19.texture1);
if ((int(sc_ProjectiveShadowsReceiver_tmp)!=0))
{
float4 l9_140=param_19.position;
float4 l9_141=l9_140;
if (sc_RenderingSpace_tmp==1)
{
l9_141=(*sc_set0.UserUniforms).sc_ModelMatrix*l9_140;
}
float4 l9_142=(*sc_set0.UserUniforms).sc_ProjectorMatrix*l9_141;
float2 l9_143=((l9_142.xy/float2(l9_142.w))*0.5)+float2(0.5);
out.varShadowTex=l9_143;
}
float4 l9_144=l9_133;
if (sc_DepthBufferMode_tmp==1)
{
int l9_145=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_145=0;
}
else
{
l9_145=gl_InstanceIndex%2;
}
int l9_146=l9_145;
if ((*sc_set0.UserUniforms).sc_ProjectionMatrixArray[l9_146][2].w!=0.0)
{
float l9_147=2.0/log2((*sc_set0.UserUniforms).sc_Camera.clipPlanes.y+1.0);
l9_144.z=((log2(fast::max((*sc_set0.UserUniforms).sc_Camera.clipPlanes.x,1.0+l9_144.w))*l9_147)-1.0)*l9_144.w;
}
}
float4 l9_148=l9_144;
l9_133=l9_148;
float4 l9_149=l9_133;
if ((int(sc_TAAEnabled_tmp)!=0))
{
float2 l9_150=l9_149.xy+((*sc_set0.UserUniforms).sc_TAAJitterOffset*l9_149.w);
l9_149=float4(l9_150.x,l9_150.y,l9_149.z,l9_149.w);
}
float4 l9_151=l9_149;
l9_133=l9_151;
float4 l9_152=l9_133;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_152.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_153=l9_152;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_154=dot(l9_153,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_155=l9_154;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_155;
}
}
float4 l9_156=float4(l9_152.x,-l9_152.y,(l9_152.z*0.5)+(l9_152.w*0.5),l9_152.w);
out.gl_Position=l9_156;
if ((int(sc_Voxelization_tmp)!=0))
{
sc_Vertex_t l9_158=param_19;
sc_Vertex_t l9_159=l9_158;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_160=l9_159;
float3 l9_161=in.blendShape0Pos;
float3 l9_162=in.blendShape0Normal;
float l9_163=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_164=l9_160;
float3 l9_165=l9_161;
float l9_166=l9_163;
float3 l9_167=l9_164.position.xyz+(l9_165*l9_166);
l9_164.position=float4(l9_167.x,l9_167.y,l9_167.z,l9_164.position.w);
l9_160=l9_164;
l9_160.normal+=(l9_162*l9_163);
l9_159=l9_160;
sc_Vertex_t l9_168=l9_159;
float3 l9_169=in.blendShape1Pos;
float3 l9_170=in.blendShape1Normal;
float l9_171=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_172=l9_168;
float3 l9_173=l9_169;
float l9_174=l9_171;
float3 l9_175=l9_172.position.xyz+(l9_173*l9_174);
l9_172.position=float4(l9_175.x,l9_175.y,l9_175.z,l9_172.position.w);
l9_168=l9_172;
l9_168.normal+=(l9_170*l9_171);
l9_159=l9_168;
sc_Vertex_t l9_176=l9_159;
float3 l9_177=in.blendShape2Pos;
float3 l9_178=in.blendShape2Normal;
float l9_179=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_180=l9_176;
float3 l9_181=l9_177;
float l9_182=l9_179;
float3 l9_183=l9_180.position.xyz+(l9_181*l9_182);
l9_180.position=float4(l9_183.x,l9_183.y,l9_183.z,l9_180.position.w);
l9_176=l9_180;
l9_176.normal+=(l9_178*l9_179);
l9_159=l9_176;
}
else
{
sc_Vertex_t l9_184=l9_159;
float3 l9_185=in.blendShape0Pos;
float l9_186=(*sc_set0.UserUniforms).weights0.x;
float3 l9_187=l9_184.position.xyz+(l9_185*l9_186);
l9_184.position=float4(l9_187.x,l9_187.y,l9_187.z,l9_184.position.w);
l9_159=l9_184;
sc_Vertex_t l9_188=l9_159;
float3 l9_189=in.blendShape1Pos;
float l9_190=(*sc_set0.UserUniforms).weights0.y;
float3 l9_191=l9_188.position.xyz+(l9_189*l9_190);
l9_188.position=float4(l9_191.x,l9_191.y,l9_191.z,l9_188.position.w);
l9_159=l9_188;
sc_Vertex_t l9_192=l9_159;
float3 l9_193=in.blendShape2Pos;
float l9_194=(*sc_set0.UserUniforms).weights0.z;
float3 l9_195=l9_192.position.xyz+(l9_193*l9_194);
l9_192.position=float4(l9_195.x,l9_195.y,l9_195.z,l9_192.position.w);
l9_159=l9_192;
sc_Vertex_t l9_196=l9_159;
float3 l9_197=in.blendShape3Pos;
float l9_198=(*sc_set0.UserUniforms).weights0.w;
float3 l9_199=l9_196.position.xyz+(l9_197*l9_198);
l9_196.position=float4(l9_199.x,l9_199.y,l9_199.z,l9_196.position.w);
l9_159=l9_196;
sc_Vertex_t l9_200=l9_159;
float3 l9_201=in.blendShape4Pos;
float l9_202=(*sc_set0.UserUniforms).weights1.x;
float3 l9_203=l9_200.position.xyz+(l9_201*l9_202);
l9_200.position=float4(l9_203.x,l9_203.y,l9_203.z,l9_200.position.w);
l9_159=l9_200;
sc_Vertex_t l9_204=l9_159;
float3 l9_205=in.blendShape5Pos;
float l9_206=(*sc_set0.UserUniforms).weights1.y;
float3 l9_207=l9_204.position.xyz+(l9_205*l9_206);
l9_204.position=float4(l9_207.x,l9_207.y,l9_207.z,l9_204.position.w);
l9_159=l9_204;
}
}
l9_158=l9_159;
sc_Vertex_t l9_208=l9_158;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_209=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_209=float4(1.0,fract(in.boneData.yzw));
l9_209.x-=dot(l9_209.yzw,float3(1.0));
}
float4 l9_210=l9_209;
float4 l9_211=l9_210;
int l9_212=int(in.boneData.x);
int l9_213=int(in.boneData.y);
int l9_214=int(in.boneData.z);
int l9_215=int(in.boneData.w);
int l9_216=l9_212;
float4 l9_217=l9_208.position;
float3 l9_218=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_219=l9_216;
float4 l9_220=(*sc_set0.sc_BonesUBO).sc_Bones[l9_219].boneMatrix[0];
float4 l9_221=(*sc_set0.sc_BonesUBO).sc_Bones[l9_219].boneMatrix[1];
float4 l9_222=(*sc_set0.sc_BonesUBO).sc_Bones[l9_219].boneMatrix[2];
float4 l9_223[3];
l9_223[0]=l9_220;
l9_223[1]=l9_221;
l9_223[2]=l9_222;
l9_218=float3(dot(l9_217,l9_223[0]),dot(l9_217,l9_223[1]),dot(l9_217,l9_223[2]));
}
else
{
l9_218=l9_217.xyz;
}
float3 l9_224=l9_218;
float3 l9_225=l9_224;
float l9_226=l9_211.x;
int l9_227=l9_213;
float4 l9_228=l9_208.position;
float3 l9_229=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_230=l9_227;
float4 l9_231=(*sc_set0.sc_BonesUBO).sc_Bones[l9_230].boneMatrix[0];
float4 l9_232=(*sc_set0.sc_BonesUBO).sc_Bones[l9_230].boneMatrix[1];
float4 l9_233=(*sc_set0.sc_BonesUBO).sc_Bones[l9_230].boneMatrix[2];
float4 l9_234[3];
l9_234[0]=l9_231;
l9_234[1]=l9_232;
l9_234[2]=l9_233;
l9_229=float3(dot(l9_228,l9_234[0]),dot(l9_228,l9_234[1]),dot(l9_228,l9_234[2]));
}
else
{
l9_229=l9_228.xyz;
}
float3 l9_235=l9_229;
float3 l9_236=l9_235;
float l9_237=l9_211.y;
int l9_238=l9_214;
float4 l9_239=l9_208.position;
float3 l9_240=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_241=l9_238;
float4 l9_242=(*sc_set0.sc_BonesUBO).sc_Bones[l9_241].boneMatrix[0];
float4 l9_243=(*sc_set0.sc_BonesUBO).sc_Bones[l9_241].boneMatrix[1];
float4 l9_244=(*sc_set0.sc_BonesUBO).sc_Bones[l9_241].boneMatrix[2];
float4 l9_245[3];
l9_245[0]=l9_242;
l9_245[1]=l9_243;
l9_245[2]=l9_244;
l9_240=float3(dot(l9_239,l9_245[0]),dot(l9_239,l9_245[1]),dot(l9_239,l9_245[2]));
}
else
{
l9_240=l9_239.xyz;
}
float3 l9_246=l9_240;
float3 l9_247=l9_246;
float l9_248=l9_211.z;
int l9_249=l9_215;
float4 l9_250=l9_208.position;
float3 l9_251=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_252=l9_249;
float4 l9_253=(*sc_set0.sc_BonesUBO).sc_Bones[l9_252].boneMatrix[0];
float4 l9_254=(*sc_set0.sc_BonesUBO).sc_Bones[l9_252].boneMatrix[1];
float4 l9_255=(*sc_set0.sc_BonesUBO).sc_Bones[l9_252].boneMatrix[2];
float4 l9_256[3];
l9_256[0]=l9_253;
l9_256[1]=l9_254;
l9_256[2]=l9_255;
l9_251=float3(dot(l9_250,l9_256[0]),dot(l9_250,l9_256[1]),dot(l9_250,l9_256[2]));
}
else
{
l9_251=l9_250.xyz;
}
float3 l9_257=l9_251;
float3 l9_258=(((l9_225*l9_226)+(l9_236*l9_237))+(l9_247*l9_248))+(l9_257*l9_211.w);
l9_208.position=float4(l9_258.x,l9_258.y,l9_258.z,l9_208.position.w);
int l9_259=l9_212;
float3x3 l9_260=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_259].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_259].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_259].normalMatrix[2].xyz));
float3x3 l9_261=l9_260;
float3x3 l9_262=l9_261;
int l9_263=l9_213;
float3x3 l9_264=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[2].xyz));
float3x3 l9_265=l9_264;
float3x3 l9_266=l9_265;
int l9_267=l9_214;
float3x3 l9_268=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[2].xyz));
float3x3 l9_269=l9_268;
float3x3 l9_270=l9_269;
int l9_271=l9_215;
float3x3 l9_272=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[2].xyz));
float3x3 l9_273=l9_272;
float3x3 l9_274=l9_273;
l9_208.normal=((((l9_262*l9_208.normal)*l9_211.x)+((l9_266*l9_208.normal)*l9_211.y))+((l9_270*l9_208.normal)*l9_211.z))+((l9_274*l9_208.normal)*l9_211.w);
l9_208.tangent=((((l9_262*l9_208.tangent)*l9_211.x)+((l9_266*l9_208.tangent)*l9_211.y))+((l9_270*l9_208.tangent)*l9_211.z))+((l9_274*l9_208.tangent)*l9_211.w);
}
l9_158=l9_208;
float l9_275=(*sc_set0.UserUniforms).voxelization_params_0.y;
float l9_276=(*sc_set0.UserUniforms).voxelization_params_0.z;
float l9_277=(*sc_set0.UserUniforms).voxelization_params_0.w;
float l9_278=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.x;
float l9_279=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.y;
float l9_280=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.z;
float l9_281=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.w;
float l9_282=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.x;
float l9_283=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.y;
float3 l9_284=(*sc_set0.UserUniforms).voxelization_params_camera_pos;
float l9_285=l9_275/l9_276;
int l9_286=gl_InstanceIndex;
int l9_287=l9_286;
l9_158.position=(*sc_set0.UserUniforms).sc_ModelMatrixVoxelization*l9_158.position;
float3 l9_288=l9_158.position.xyz;
float3 l9_289=float3(float(l9_287%int(l9_277))*l9_275,float(l9_287/int(l9_277))*l9_275,(float(l9_287)*l9_285)+l9_282);
float3 l9_290=l9_288+l9_289;
float4 l9_291=float4(l9_290-l9_284,1.0);
float l9_292=l9_278;
float l9_293=l9_279;
float l9_294=l9_280;
float l9_295=l9_281;
float l9_296=l9_282;
float l9_297=l9_283;
float4x4 l9_298=float4x4(float4(2.0/(l9_293-l9_292),0.0,0.0,(-(l9_293+l9_292))/(l9_293-l9_292)),float4(0.0,2.0/(l9_295-l9_294),0.0,(-(l9_295+l9_294))/(l9_295-l9_294)),float4(0.0,0.0,(-2.0)/(l9_297-l9_296),(-(l9_297+l9_296))/(l9_297-l9_296)),float4(0.0,0.0,0.0,1.0));
float4x4 l9_299=l9_298;
float4 l9_300=l9_299*l9_291;
l9_300.w=1.0;
out.varScreenPos=l9_300;
float4 l9_301=l9_300*1.0;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_301.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_302=l9_301;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_303=dot(l9_302,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_304=l9_303;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_304;
}
}
float4 l9_305=float4(l9_301.x,-l9_301.y,(l9_301.z*0.5)+(l9_301.w*0.5),l9_301.w);
out.gl_Position=l9_305;
param_19=l9_158;
}
else
{
if ((int(sc_OutputBounds_tmp)!=0))
{
sc_Vertex_t l9_306=param_19;
sc_Vertex_t l9_307=l9_306;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_308=l9_307;
float3 l9_309=in.blendShape0Pos;
float3 l9_310=in.blendShape0Normal;
float l9_311=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_312=l9_308;
float3 l9_313=l9_309;
float l9_314=l9_311;
float3 l9_315=l9_312.position.xyz+(l9_313*l9_314);
l9_312.position=float4(l9_315.x,l9_315.y,l9_315.z,l9_312.position.w);
l9_308=l9_312;
l9_308.normal+=(l9_310*l9_311);
l9_307=l9_308;
sc_Vertex_t l9_316=l9_307;
float3 l9_317=in.blendShape1Pos;
float3 l9_318=in.blendShape1Normal;
float l9_319=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_320=l9_316;
float3 l9_321=l9_317;
float l9_322=l9_319;
float3 l9_323=l9_320.position.xyz+(l9_321*l9_322);
l9_320.position=float4(l9_323.x,l9_323.y,l9_323.z,l9_320.position.w);
l9_316=l9_320;
l9_316.normal+=(l9_318*l9_319);
l9_307=l9_316;
sc_Vertex_t l9_324=l9_307;
float3 l9_325=in.blendShape2Pos;
float3 l9_326=in.blendShape2Normal;
float l9_327=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_328=l9_324;
float3 l9_329=l9_325;
float l9_330=l9_327;
float3 l9_331=l9_328.position.xyz+(l9_329*l9_330);
l9_328.position=float4(l9_331.x,l9_331.y,l9_331.z,l9_328.position.w);
l9_324=l9_328;
l9_324.normal+=(l9_326*l9_327);
l9_307=l9_324;
}
else
{
sc_Vertex_t l9_332=l9_307;
float3 l9_333=in.blendShape0Pos;
float l9_334=(*sc_set0.UserUniforms).weights0.x;
float3 l9_335=l9_332.position.xyz+(l9_333*l9_334);
l9_332.position=float4(l9_335.x,l9_335.y,l9_335.z,l9_332.position.w);
l9_307=l9_332;
sc_Vertex_t l9_336=l9_307;
float3 l9_337=in.blendShape1Pos;
float l9_338=(*sc_set0.UserUniforms).weights0.y;
float3 l9_339=l9_336.position.xyz+(l9_337*l9_338);
l9_336.position=float4(l9_339.x,l9_339.y,l9_339.z,l9_336.position.w);
l9_307=l9_336;
sc_Vertex_t l9_340=l9_307;
float3 l9_341=in.blendShape2Pos;
float l9_342=(*sc_set0.UserUniforms).weights0.z;
float3 l9_343=l9_340.position.xyz+(l9_341*l9_342);
l9_340.position=float4(l9_343.x,l9_343.y,l9_343.z,l9_340.position.w);
l9_307=l9_340;
sc_Vertex_t l9_344=l9_307;
float3 l9_345=in.blendShape3Pos;
float l9_346=(*sc_set0.UserUniforms).weights0.w;
float3 l9_347=l9_344.position.xyz+(l9_345*l9_346);
l9_344.position=float4(l9_347.x,l9_347.y,l9_347.z,l9_344.position.w);
l9_307=l9_344;
sc_Vertex_t l9_348=l9_307;
float3 l9_349=in.blendShape4Pos;
float l9_350=(*sc_set0.UserUniforms).weights1.x;
float3 l9_351=l9_348.position.xyz+(l9_349*l9_350);
l9_348.position=float4(l9_351.x,l9_351.y,l9_351.z,l9_348.position.w);
l9_307=l9_348;
sc_Vertex_t l9_352=l9_307;
float3 l9_353=in.blendShape5Pos;
float l9_354=(*sc_set0.UserUniforms).weights1.y;
float3 l9_355=l9_352.position.xyz+(l9_353*l9_354);
l9_352.position=float4(l9_355.x,l9_355.y,l9_355.z,l9_352.position.w);
l9_307=l9_352;
}
}
l9_306=l9_307;
sc_Vertex_t l9_356=l9_306;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_357=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_357=float4(1.0,fract(in.boneData.yzw));
l9_357.x-=dot(l9_357.yzw,float3(1.0));
}
float4 l9_358=l9_357;
float4 l9_359=l9_358;
int l9_360=int(in.boneData.x);
int l9_361=int(in.boneData.y);
int l9_362=int(in.boneData.z);
int l9_363=int(in.boneData.w);
int l9_364=l9_360;
float4 l9_365=l9_356.position;
float3 l9_366=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_367=l9_364;
float4 l9_368=(*sc_set0.sc_BonesUBO).sc_Bones[l9_367].boneMatrix[0];
float4 l9_369=(*sc_set0.sc_BonesUBO).sc_Bones[l9_367].boneMatrix[1];
float4 l9_370=(*sc_set0.sc_BonesUBO).sc_Bones[l9_367].boneMatrix[2];
float4 l9_371[3];
l9_371[0]=l9_368;
l9_371[1]=l9_369;
l9_371[2]=l9_370;
l9_366=float3(dot(l9_365,l9_371[0]),dot(l9_365,l9_371[1]),dot(l9_365,l9_371[2]));
}
else
{
l9_366=l9_365.xyz;
}
float3 l9_372=l9_366;
float3 l9_373=l9_372;
float l9_374=l9_359.x;
int l9_375=l9_361;
float4 l9_376=l9_356.position;
float3 l9_377=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_378=l9_375;
float4 l9_379=(*sc_set0.sc_BonesUBO).sc_Bones[l9_378].boneMatrix[0];
float4 l9_380=(*sc_set0.sc_BonesUBO).sc_Bones[l9_378].boneMatrix[1];
float4 l9_381=(*sc_set0.sc_BonesUBO).sc_Bones[l9_378].boneMatrix[2];
float4 l9_382[3];
l9_382[0]=l9_379;
l9_382[1]=l9_380;
l9_382[2]=l9_381;
l9_377=float3(dot(l9_376,l9_382[0]),dot(l9_376,l9_382[1]),dot(l9_376,l9_382[2]));
}
else
{
l9_377=l9_376.xyz;
}
float3 l9_383=l9_377;
float3 l9_384=l9_383;
float l9_385=l9_359.y;
int l9_386=l9_362;
float4 l9_387=l9_356.position;
float3 l9_388=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_389=l9_386;
float4 l9_390=(*sc_set0.sc_BonesUBO).sc_Bones[l9_389].boneMatrix[0];
float4 l9_391=(*sc_set0.sc_BonesUBO).sc_Bones[l9_389].boneMatrix[1];
float4 l9_392=(*sc_set0.sc_BonesUBO).sc_Bones[l9_389].boneMatrix[2];
float4 l9_393[3];
l9_393[0]=l9_390;
l9_393[1]=l9_391;
l9_393[2]=l9_392;
l9_388=float3(dot(l9_387,l9_393[0]),dot(l9_387,l9_393[1]),dot(l9_387,l9_393[2]));
}
else
{
l9_388=l9_387.xyz;
}
float3 l9_394=l9_388;
float3 l9_395=l9_394;
float l9_396=l9_359.z;
int l9_397=l9_363;
float4 l9_398=l9_356.position;
float3 l9_399=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_400=l9_397;
float4 l9_401=(*sc_set0.sc_BonesUBO).sc_Bones[l9_400].boneMatrix[0];
float4 l9_402=(*sc_set0.sc_BonesUBO).sc_Bones[l9_400].boneMatrix[1];
float4 l9_403=(*sc_set0.sc_BonesUBO).sc_Bones[l9_400].boneMatrix[2];
float4 l9_404[3];
l9_404[0]=l9_401;
l9_404[1]=l9_402;
l9_404[2]=l9_403;
l9_399=float3(dot(l9_398,l9_404[0]),dot(l9_398,l9_404[1]),dot(l9_398,l9_404[2]));
}
else
{
l9_399=l9_398.xyz;
}
float3 l9_405=l9_399;
float3 l9_406=(((l9_373*l9_374)+(l9_384*l9_385))+(l9_395*l9_396))+(l9_405*l9_359.w);
l9_356.position=float4(l9_406.x,l9_406.y,l9_406.z,l9_356.position.w);
int l9_407=l9_360;
float3x3 l9_408=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_407].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_407].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_407].normalMatrix[2].xyz));
float3x3 l9_409=l9_408;
float3x3 l9_410=l9_409;
int l9_411=l9_361;
float3x3 l9_412=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[2].xyz));
float3x3 l9_413=l9_412;
float3x3 l9_414=l9_413;
int l9_415=l9_362;
float3x3 l9_416=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[2].xyz));
float3x3 l9_417=l9_416;
float3x3 l9_418=l9_417;
int l9_419=l9_363;
float3x3 l9_420=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[2].xyz));
float3x3 l9_421=l9_420;
float3x3 l9_422=l9_421;
l9_356.normal=((((l9_410*l9_356.normal)*l9_359.x)+((l9_414*l9_356.normal)*l9_359.y))+((l9_418*l9_356.normal)*l9_359.z))+((l9_422*l9_356.normal)*l9_359.w);
l9_356.tangent=((((l9_410*l9_356.tangent)*l9_359.x)+((l9_414*l9_356.tangent)*l9_359.y))+((l9_418*l9_356.tangent)*l9_359.z))+((l9_422*l9_356.tangent)*l9_359.w);
}
l9_306=l9_356;
float3 l9_423=(*sc_set0.UserUniforms).voxelization_params_camera_pos;
float2 l9_424=((l9_306.position.xy/float2(l9_306.position.w))*0.5)+float2(0.5);
out.varTex01=float4(l9_424.x,l9_424.y,out.varTex01.z,out.varTex01.w);
l9_306.position=(*sc_set0.UserUniforms).sc_ModelMatrixVoxelization*l9_306.position;
float3 l9_425=l9_306.position.xyz-l9_423;
l9_306.position=float4(l9_425.x,l9_425.y,l9_425.z,l9_306.position.w);
out.varPosAndMotion=float4(l9_306.position.xyz.x,l9_306.position.xyz.y,l9_306.position.xyz.z,out.varPosAndMotion.w);
float3 l9_426=normalize(l9_306.normal);
out.varNormalAndMotion=float4(l9_426.x,l9_426.y,l9_426.z,out.varNormalAndMotion.w);
float l9_427=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.x;
float l9_428=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.y;
float l9_429=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.z;
float l9_430=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.w;
float l9_431=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.x;
float l9_432=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.y;
float l9_433=l9_427;
float l9_434=l9_428;
float l9_435=l9_429;
float l9_436=l9_430;
float l9_437=l9_431;
float l9_438=l9_432;
float4x4 l9_439=float4x4(float4(2.0/(l9_434-l9_433),0.0,0.0,(-(l9_434+l9_433))/(l9_434-l9_433)),float4(0.0,2.0/(l9_436-l9_435),0.0,(-(l9_436+l9_435))/(l9_436-l9_435)),float4(0.0,0.0,(-2.0)/(l9_438-l9_437),(-(l9_438+l9_437))/(l9_438-l9_437)),float4(0.0,0.0,0.0,1.0));
float4x4 l9_440=l9_439;
float4 l9_441=float4(0.0);
float3 l9_442=(l9_440*l9_306.position).xyz;
l9_441=float4(l9_442.x,l9_442.y,l9_442.z,l9_441.w);
l9_441.w=1.0;
out.varScreenPos=l9_441;
float4 l9_443=l9_441*1.0;
float4 l9_444=l9_443;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_444.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_445=l9_444;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_446=dot(l9_445,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_447=l9_446;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_447;
}
}
float4 l9_448=float4(l9_444.x,-l9_444.y,(l9_444.z*0.5)+(l9_444.w*0.5),l9_444.w);
out.gl_Position=l9_448;
param_19=l9_306;
}
}
v=param_19;
float3 param_24=out.varPosAndMotion.xyz;
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
float4 l9_449=((*sc_set0.UserUniforms).sc_PrevFrameModelMatrix*(*sc_set0.UserUniforms).sc_ModelMatrixInverse)*float4(param_24,1.0);
float3 l9_450=param_24;
float3 l9_451=l9_449.xyz;
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
int l9_452=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_452=0;
}
else
{
l9_452=gl_InstanceIndex%2;
}
int l9_453=l9_452;
float4 l9_454=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_453]*float4(l9_450,1.0);
float2 l9_455=l9_454.xy/float2(l9_454.w);
l9_454=float4(l9_455.x,l9_455.y,l9_454.z,l9_454.w);
int l9_456=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_456=0;
}
else
{
l9_456=gl_InstanceIndex%2;
}
int l9_457=l9_456;
float4 l9_458=(*sc_set0.UserUniforms).sc_PrevFrameViewProjectionMatrixArray[l9_457]*float4(l9_451,1.0);
float2 l9_459=l9_458.xy/float2(l9_458.w);
l9_458=float4(l9_459.x,l9_459.y,l9_458.z,l9_458.w);
float2 l9_460=(l9_454.xy-l9_458.xy)*0.5;
out.varPosAndMotion.w=l9_460.x;
out.varNormalAndMotion.w=l9_460.y;
}
}
if (PreviewInfo.Saved)
{
out.PreviewVertexColor=float4(PreviewInfo.Color.xyz,1.0);
out.PreviewVertexSaved=1.0;
}
return out;
}
} // VERTEX SHADER


namespace SNAP_FS {
struct ssGlobals
{
float gTimeElapsed;
float gTimeDelta;
float gTimeElapsedShifted;
float3 SurfacePosition_ObjectSpace;
};
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float shaderComplexityValue;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
float4 voxelization_params_0;
float4 voxelization_params_frustum_lrbt;
float4 voxelization_params_frustum_nf;
float3 voxelization_params_camera_pos;
float4x4 sc_ModelMatrixVoxelization;
float correctedIntensity;
float4 intensityTextureSize;
float4 intensityTextureDims;
float4 intensityTextureView;
float3x3 intensityTextureTransform;
float4 intensityTextureUvMinMax;
float4 intensityTextureBorderColor;
float reflBlurWidth;
float reflBlurMinRough;
float reflBlurMaxRough;
int overrideTimeEnabled;
float overrideTimeElapsed[32];
float overrideTimeDelta;
int PreviewEnabled;
int PreviewNodeID;
float alphaTestThreshold;
float2 size;
float cornerRadius;
float4 backgroundTextureSize;
float4 backgroundTextureDims;
float4 backgroundTextureView;
float3x3 backgroundTextureTransform;
float4 backgroundTextureUvMinMax;
float4 backgroundTextureBorderColor;
float useTexture;
float2 textureMode;
float textureWrap;
float4 backgroundColor;
float4 colors[6];
float percents[6];
int stops;
float linearGradientStart;
float linearGradientEnd;
float linearGradientAngle;
float linearGradientLength;
float2 gradientStartPosition;
float radialGradientLength;
float border;
float borderSize;
float gradientType;
float4 highlightColorStop2;
float4 highlightColorStop1;
float highlightStop1;
float highlightStop2;
float2 cursorPosition;
float highlightSize;
float4 highlightActiveColorStop2;
float4 highlightActiveColorStop1;
float isActive;
float isHovered;
float4 circleTextureSize;
float4 circleTextureDims;
float4 circleTextureView;
float3x3 circleTextureTransform;
float4 circleTextureUvMinMax;
float4 circleTextureBorderColor;
int borderOnly;
int cutOutCenter;
float frameBorder;
float4 grabZones[8];
float grabZonesCount;
float dotsHighlightStop1;
float dotsHighlightStop2;
float dotsScalar;
float4 borderColor;
float4 borderGradientColors[6];
float borderGradientPercents[6];
int borderGradientStops;
float borderLinearGradientStart;
float borderLinearGradientEnd;
float borderLinearGradientAngle;
float borderLinearGradientLength;
float2 borderGradientStartPosition;
float borderRadialGradientLength;
float borderGradientType;
float edgeHighlightStop1;
float edgeHighlightStop2;
float opacityFactor;
float Port_Input0_N008;
float Port_Input1_N008;
float2 Port_Import_N023;
float Port_Import_N024;
float Port_Input1_N032;
float2 Port_Input1_N025;
float Port_Input0_N010;
float Port_Input0_N016;
float Port_Input0_N017;
float Port_Input0_N043;
float Port_Input0_N069;
float Port_Input1_N068;
float Port_borderSoftness_N007;
float Port_Input1_N105;
float Port_Input1_N106;
float Port_Input1_N122;
float Port_Input1_N090;
float Port_Input0_N119;
float Port_Default_N117;
};
struct ssPreviewInfo
{
float4 Color;
bool Saved;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct sc_Set0
{
constant sc_Bones_obj* sc_BonesUBO [[id(0)]];
texture2d<float> backgroundTexture [[id(1)]];
texture2d<float> circleTexture [[id(2)]];
texture2d<float> intensityTexture [[id(3)]];
texture2d<float> sc_ScreenTexture [[id(15)]];
sampler backgroundTextureSmpSC [[id(18)]];
sampler circleTextureSmpSC [[id(19)]];
sampler intensityTextureSmpSC [[id(20)]];
sampler sc_ScreenTextureSmpSC [[id(25)]];
constant userUniformsObj* UserUniforms [[id(28)]];
};
struct main_frag_out
{
float4 sc_FragData0 [[color(0)]];
};
struct main_frag_in
{
float4 varPosAndMotion [[user(locn0)]];
float4 varNormalAndMotion [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varTex01 [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
float4 varColor [[user(locn10)]];
float4 PreviewVertexColor [[user(locn11)]];
float PreviewVertexSaved [[user(locn12)]];
};
// Implementation of the GLSL mod() function,which is slightly different than Metal fmod()
template<typename Tx,typename Ty>
Tx mod(Tx x,Ty y)
{
return x-y*floor(x/y);
}
float transformSingleColor(thread const float& original,thread const float& intMap,thread const float& target)
{
if (((int(BLEND_MODE_REALISTIC_tmp)!=0)||(int(BLEND_MODE_FORGRAY_tmp)!=0))||(int(BLEND_MODE_NOTBRIGHT_tmp)!=0))
{
return original/pow(1.0-target,intMap);
}
else
{
if ((int(BLEND_MODE_DIVISION_tmp)!=0))
{
return original/(1.0-target);
}
else
{
if ((int(BLEND_MODE_BRIGHT_tmp)!=0))
{
return original/pow(1.0-target,2.0-(2.0*original));
}
}
}
return 0.0;
}
float3 transformColor(thread const float& yValue,thread const float3& original,thread const float3& target,thread const float& weight,thread const float& intMap)
{
if ((int(BLEND_MODE_INTENSE_tmp)!=0))
{
float3 param=original;
float3 l9_0=param;
float4 l9_1;
if (l9_0.y<l9_0.z)
{
l9_1=float4(l9_0.zy,-1.0,0.66666669);
}
else
{
l9_1=float4(l9_0.yz,0.0,-0.33333334);
}
float4 l9_2=l9_1;
float4 l9_3;
if (l9_0.x<l9_2.x)
{
l9_3=float4(l9_2.xyw,l9_0.x);
}
else
{
l9_3=float4(l9_0.x,l9_2.yzx);
}
float4 l9_4=l9_3;
float l9_5=l9_4.x-fast::min(l9_4.w,l9_4.y);
float l9_6=abs(((l9_4.w-l9_4.y)/((6.0*l9_5)+1e-07))+l9_4.z);
float l9_7=l9_4.x;
float3 l9_8=float3(l9_6,l9_5,l9_7);
float3 l9_9=l9_8;
float l9_10=l9_9.z-(l9_9.y*0.5);
float l9_11=l9_9.y/((1.0-abs((2.0*l9_10)-1.0))+1e-07);
float3 l9_12=float3(l9_9.x,l9_11,l9_10);
float3 hslOrig=l9_12;
float3 res=float3(0.0);
res.x=target.x;
res.y=target.y;
res.z=hslOrig.z;
float3 param_1=res;
float l9_13=param_1.x;
float l9_14=abs((6.0*l9_13)-3.0)-1.0;
float l9_15=2.0-abs((6.0*l9_13)-2.0);
float l9_16=2.0-abs((6.0*l9_13)-4.0);
float3 l9_17=fast::clamp(float3(l9_14,l9_15,l9_16),float3(0.0),float3(1.0));
float3 l9_18=l9_17;
float l9_19=(1.0-abs((2.0*param_1.z)-1.0))*param_1.y;
l9_18=((l9_18-float3(0.5))*l9_19)+float3(param_1.z);
float3 l9_20=l9_18;
res=l9_20;
float3 resColor=mix(original,res,float3(weight));
return resColor;
}
else
{
float3 tmpColor=float3(0.0);
float param_2=yValue;
float param_3=intMap;
float param_4=target.x;
tmpColor.x=transformSingleColor(param_2,param_3,param_4);
float param_5=yValue;
float param_6=intMap;
float param_7=target.y;
tmpColor.y=transformSingleColor(param_5,param_6,param_7);
float param_8=yValue;
float param_9=intMap;
float param_10=target.z;
tmpColor.z=transformSingleColor(param_8,param_9,param_10);
tmpColor=fast::clamp(tmpColor,float3(0.0),float3(1.0));
float3 resColor_1=mix(original,tmpColor,float3(weight));
return resColor_1;
}
}
float3 definedBlend(thread const float3& a,thread const float3& b,thread int& varStereoViewID,constant userUniformsObj& UserUniforms,thread texture2d<float> intensityTexture,thread sampler intensityTextureSmpSC)
{
if ((int(BLEND_MODE_LIGHTEN_tmp)!=0))
{
return fast::max(a,b);
}
else
{
if ((int(BLEND_MODE_DARKEN_tmp)!=0))
{
return fast::min(a,b);
}
else
{
if ((int(BLEND_MODE_DIVIDE_tmp)!=0))
{
return b/a;
}
else
{
if ((int(BLEND_MODE_AVERAGE_tmp)!=0))
{
return (a+b)*0.5;
}
else
{
if ((int(BLEND_MODE_SUBTRACT_tmp)!=0))
{
return fast::max((a+b)-float3(1.0),float3(0.0));
}
else
{
if ((int(BLEND_MODE_DIFFERENCE_tmp)!=0))
{
return abs(a-b);
}
else
{
if ((int(BLEND_MODE_NEGATION_tmp)!=0))
{
return float3(1.0)-abs((float3(1.0)-a)-b);
}
else
{
if ((int(BLEND_MODE_EXCLUSION_tmp)!=0))
{
return (a+b)-((a*2.0)*b);
}
else
{
if ((int(BLEND_MODE_OVERLAY_tmp)!=0))
{
float l9_0;
if (a.x<0.5)
{
l9_0=(2.0*a.x)*b.x;
}
else
{
l9_0=1.0-((2.0*(1.0-a.x))*(1.0-b.x));
}
float l9_1=l9_0;
float l9_2;
if (a.y<0.5)
{
l9_2=(2.0*a.y)*b.y;
}
else
{
l9_2=1.0-((2.0*(1.0-a.y))*(1.0-b.y));
}
float l9_3=l9_2;
float l9_4;
if (a.z<0.5)
{
l9_4=(2.0*a.z)*b.z;
}
else
{
l9_4=1.0-((2.0*(1.0-a.z))*(1.0-b.z));
}
return float3(l9_1,l9_3,l9_4);
}
else
{
if ((int(BLEND_MODE_SOFT_LIGHT_tmp)!=0))
{
return (((float3(1.0)-(b*2.0))*a)*a)+((a*2.0)*b);
}
else
{
if ((int(BLEND_MODE_HARD_LIGHT_tmp)!=0))
{
float l9_5;
if (b.x<0.5)
{
l9_5=(2.0*b.x)*a.x;
}
else
{
l9_5=1.0-((2.0*(1.0-b.x))*(1.0-a.x));
}
float l9_6=l9_5;
float l9_7;
if (b.y<0.5)
{
l9_7=(2.0*b.y)*a.y;
}
else
{
l9_7=1.0-((2.0*(1.0-b.y))*(1.0-a.y));
}
float l9_8=l9_7;
float l9_9;
if (b.z<0.5)
{
l9_9=(2.0*b.z)*a.z;
}
else
{
l9_9=1.0-((2.0*(1.0-b.z))*(1.0-a.z));
}
return float3(l9_6,l9_8,l9_9);
}
else
{
if ((int(BLEND_MODE_COLOR_DODGE_tmp)!=0))
{
float l9_10;
if (b.x==1.0)
{
l9_10=b.x;
}
else
{
l9_10=fast::min(a.x/(1.0-b.x),1.0);
}
float l9_11=l9_10;
float l9_12;
if (b.y==1.0)
{
l9_12=b.y;
}
else
{
l9_12=fast::min(a.y/(1.0-b.y),1.0);
}
float l9_13=l9_12;
float l9_14;
if (b.z==1.0)
{
l9_14=b.z;
}
else
{
l9_14=fast::min(a.z/(1.0-b.z),1.0);
}
return float3(l9_11,l9_13,l9_14);
}
else
{
if ((int(BLEND_MODE_COLOR_BURN_tmp)!=0))
{
float l9_15;
if (b.x==0.0)
{
l9_15=b.x;
}
else
{
l9_15=fast::max(1.0-((1.0-a.x)/b.x),0.0);
}
float l9_16=l9_15;
float l9_17;
if (b.y==0.0)
{
l9_17=b.y;
}
else
{
l9_17=fast::max(1.0-((1.0-a.y)/b.y),0.0);
}
float l9_18=l9_17;
float l9_19;
if (b.z==0.0)
{
l9_19=b.z;
}
else
{
l9_19=fast::max(1.0-((1.0-a.z)/b.z),0.0);
}
return float3(l9_16,l9_18,l9_19);
}
else
{
if ((int(BLEND_MODE_LINEAR_LIGHT_tmp)!=0))
{
float l9_20;
if (b.x<0.5)
{
l9_20=fast::max((a.x+(2.0*b.x))-1.0,0.0);
}
else
{
l9_20=fast::min(a.x+(2.0*(b.x-0.5)),1.0);
}
float l9_21=l9_20;
float l9_22;
if (b.y<0.5)
{
l9_22=fast::max((a.y+(2.0*b.y))-1.0,0.0);
}
else
{
l9_22=fast::min(a.y+(2.0*(b.y-0.5)),1.0);
}
float l9_23=l9_22;
float l9_24;
if (b.z<0.5)
{
l9_24=fast::max((a.z+(2.0*b.z))-1.0,0.0);
}
else
{
l9_24=fast::min(a.z+(2.0*(b.z-0.5)),1.0);
}
return float3(l9_21,l9_23,l9_24);
}
else
{
if ((int(BLEND_MODE_VIVID_LIGHT_tmp)!=0))
{
float l9_25;
if (b.x<0.5)
{
float l9_26;
if ((2.0*b.x)==0.0)
{
l9_26=2.0*b.x;
}
else
{
l9_26=fast::max(1.0-((1.0-a.x)/(2.0*b.x)),0.0);
}
l9_25=l9_26;
}
else
{
float l9_27;
if ((2.0*(b.x-0.5))==1.0)
{
l9_27=2.0*(b.x-0.5);
}
else
{
l9_27=fast::min(a.x/(1.0-(2.0*(b.x-0.5))),1.0);
}
l9_25=l9_27;
}
float l9_28=l9_25;
float l9_29;
if (b.y<0.5)
{
float l9_30;
if ((2.0*b.y)==0.0)
{
l9_30=2.0*b.y;
}
else
{
l9_30=fast::max(1.0-((1.0-a.y)/(2.0*b.y)),0.0);
}
l9_29=l9_30;
}
else
{
float l9_31;
if ((2.0*(b.y-0.5))==1.0)
{
l9_31=2.0*(b.y-0.5);
}
else
{
l9_31=fast::min(a.y/(1.0-(2.0*(b.y-0.5))),1.0);
}
l9_29=l9_31;
}
float l9_32=l9_29;
float l9_33;
if (b.z<0.5)
{
float l9_34;
if ((2.0*b.z)==0.0)
{
l9_34=2.0*b.z;
}
else
{
l9_34=fast::max(1.0-((1.0-a.z)/(2.0*b.z)),0.0);
}
l9_33=l9_34;
}
else
{
float l9_35;
if ((2.0*(b.z-0.5))==1.0)
{
l9_35=2.0*(b.z-0.5);
}
else
{
l9_35=fast::min(a.z/(1.0-(2.0*(b.z-0.5))),1.0);
}
l9_33=l9_35;
}
return float3(l9_28,l9_32,l9_33);
}
else
{
if ((int(BLEND_MODE_PIN_LIGHT_tmp)!=0))
{
float l9_36;
if (b.x<0.5)
{
l9_36=fast::min(a.x,2.0*b.x);
}
else
{
l9_36=fast::max(a.x,2.0*(b.x-0.5));
}
float l9_37=l9_36;
float l9_38;
if (b.y<0.5)
{
l9_38=fast::min(a.y,2.0*b.y);
}
else
{
l9_38=fast::max(a.y,2.0*(b.y-0.5));
}
float l9_39=l9_38;
float l9_40;
if (b.z<0.5)
{
l9_40=fast::min(a.z,2.0*b.z);
}
else
{
l9_40=fast::max(a.z,2.0*(b.z-0.5));
}
return float3(l9_37,l9_39,l9_40);
}
else
{
if ((int(BLEND_MODE_HARD_MIX_tmp)!=0))
{
float l9_41;
if (b.x<0.5)
{
float l9_42;
if ((2.0*b.x)==0.0)
{
l9_42=2.0*b.x;
}
else
{
l9_42=fast::max(1.0-((1.0-a.x)/(2.0*b.x)),0.0);
}
l9_41=l9_42;
}
else
{
float l9_43;
if ((2.0*(b.x-0.5))==1.0)
{
l9_43=2.0*(b.x-0.5);
}
else
{
l9_43=fast::min(a.x/(1.0-(2.0*(b.x-0.5))),1.0);
}
l9_41=l9_43;
}
float l9_44=l9_41;
float l9_45;
if (b.y<0.5)
{
float l9_46;
if ((2.0*b.y)==0.0)
{
l9_46=2.0*b.y;
}
else
{
l9_46=fast::max(1.0-((1.0-a.y)/(2.0*b.y)),0.0);
}
l9_45=l9_46;
}
else
{
float l9_47;
if ((2.0*(b.y-0.5))==1.0)
{
l9_47=2.0*(b.y-0.5);
}
else
{
l9_47=fast::min(a.y/(1.0-(2.0*(b.y-0.5))),1.0);
}
l9_45=l9_47;
}
float l9_48=l9_45;
float l9_49;
if (b.z<0.5)
{
float l9_50;
if ((2.0*b.z)==0.0)
{
l9_50=2.0*b.z;
}
else
{
l9_50=fast::max(1.0-((1.0-a.z)/(2.0*b.z)),0.0);
}
l9_49=l9_50;
}
else
{
float l9_51;
if ((2.0*(b.z-0.5))==1.0)
{
l9_51=2.0*(b.z-0.5);
}
else
{
l9_51=fast::min(a.z/(1.0-(2.0*(b.z-0.5))),1.0);
}
l9_49=l9_51;
}
return float3((l9_44<0.5) ? 0.0 : 1.0,(l9_48<0.5) ? 0.0 : 1.0,(l9_49<0.5) ? 0.0 : 1.0);
}
else
{
if ((int(BLEND_MODE_HARD_REFLECT_tmp)!=0))
{
float l9_52;
if (b.x==1.0)
{
l9_52=b.x;
}
else
{
l9_52=fast::min((a.x*a.x)/(1.0-b.x),1.0);
}
float l9_53=l9_52;
float l9_54;
if (b.y==1.0)
{
l9_54=b.y;
}
else
{
l9_54=fast::min((a.y*a.y)/(1.0-b.y),1.0);
}
float l9_55=l9_54;
float l9_56;
if (b.z==1.0)
{
l9_56=b.z;
}
else
{
l9_56=fast::min((a.z*a.z)/(1.0-b.z),1.0);
}
return float3(l9_53,l9_55,l9_56);
}
else
{
if ((int(BLEND_MODE_HARD_GLOW_tmp)!=0))
{
float l9_57;
if (a.x==1.0)
{
l9_57=a.x;
}
else
{
l9_57=fast::min((b.x*b.x)/(1.0-a.x),1.0);
}
float l9_58=l9_57;
float l9_59;
if (a.y==1.0)
{
l9_59=a.y;
}
else
{
l9_59=fast::min((b.y*b.y)/(1.0-a.y),1.0);
}
float l9_60=l9_59;
float l9_61;
if (a.z==1.0)
{
l9_61=a.z;
}
else
{
l9_61=fast::min((b.z*b.z)/(1.0-a.z),1.0);
}
return float3(l9_58,l9_60,l9_61);
}
else
{
if ((int(BLEND_MODE_HARD_PHOENIX_tmp)!=0))
{
return (fast::min(a,b)-fast::max(a,b))+float3(1.0);
}
else
{
if ((int(BLEND_MODE_HUE_tmp)!=0))
{
float3 param=a;
float3 param_1=b;
float3 l9_62=param;
float3 l9_63=l9_62;
float4 l9_64;
if (l9_63.y<l9_63.z)
{
l9_64=float4(l9_63.zy,-1.0,0.66666669);
}
else
{
l9_64=float4(l9_63.yz,0.0,-0.33333334);
}
float4 l9_65=l9_64;
float4 l9_66;
if (l9_63.x<l9_65.x)
{
l9_66=float4(l9_65.xyw,l9_63.x);
}
else
{
l9_66=float4(l9_63.x,l9_65.yzx);
}
float4 l9_67=l9_66;
float l9_68=l9_67.x-fast::min(l9_67.w,l9_67.y);
float l9_69=abs(((l9_67.w-l9_67.y)/((6.0*l9_68)+1e-07))+l9_67.z);
float l9_70=l9_67.x;
float3 l9_71=float3(l9_69,l9_68,l9_70);
float3 l9_72=l9_71;
float l9_73=l9_72.z-(l9_72.y*0.5);
float l9_74=l9_72.y/((1.0-abs((2.0*l9_73)-1.0))+1e-07);
float3 l9_75=float3(l9_72.x,l9_74,l9_73);
float3 l9_76=l9_75;
float3 l9_77=param_1;
float3 l9_78=l9_77;
float4 l9_79;
if (l9_78.y<l9_78.z)
{
l9_79=float4(l9_78.zy,-1.0,0.66666669);
}
else
{
l9_79=float4(l9_78.yz,0.0,-0.33333334);
}
float4 l9_80=l9_79;
float4 l9_81;
if (l9_78.x<l9_80.x)
{
l9_81=float4(l9_80.xyw,l9_78.x);
}
else
{
l9_81=float4(l9_78.x,l9_80.yzx);
}
float4 l9_82=l9_81;
float l9_83=l9_82.x-fast::min(l9_82.w,l9_82.y);
float l9_84=abs(((l9_82.w-l9_82.y)/((6.0*l9_83)+1e-07))+l9_82.z);
float l9_85=l9_82.x;
float3 l9_86=float3(l9_84,l9_83,l9_85);
float3 l9_87=l9_86;
float l9_88=l9_87.z-(l9_87.y*0.5);
float l9_89=l9_87.y/((1.0-abs((2.0*l9_88)-1.0))+1e-07);
float3 l9_90=float3(l9_87.x,l9_89,l9_88);
float3 l9_91=float3(l9_90.x,l9_76.y,l9_76.z);
float l9_92=l9_91.x;
float l9_93=abs((6.0*l9_92)-3.0)-1.0;
float l9_94=2.0-abs((6.0*l9_92)-2.0);
float l9_95=2.0-abs((6.0*l9_92)-4.0);
float3 l9_96=fast::clamp(float3(l9_93,l9_94,l9_95),float3(0.0),float3(1.0));
float3 l9_97=l9_96;
float l9_98=(1.0-abs((2.0*l9_91.z)-1.0))*l9_91.y;
l9_97=((l9_97-float3(0.5))*l9_98)+float3(l9_91.z);
float3 l9_99=l9_97;
float3 l9_100=l9_99;
return l9_100;
}
else
{
if ((int(BLEND_MODE_SATURATION_tmp)!=0))
{
float3 param_2=a;
float3 param_3=b;
float3 l9_101=param_2;
float3 l9_102=l9_101;
float4 l9_103;
if (l9_102.y<l9_102.z)
{
l9_103=float4(l9_102.zy,-1.0,0.66666669);
}
else
{
l9_103=float4(l9_102.yz,0.0,-0.33333334);
}
float4 l9_104=l9_103;
float4 l9_105;
if (l9_102.x<l9_104.x)
{
l9_105=float4(l9_104.xyw,l9_102.x);
}
else
{
l9_105=float4(l9_102.x,l9_104.yzx);
}
float4 l9_106=l9_105;
float l9_107=l9_106.x-fast::min(l9_106.w,l9_106.y);
float l9_108=abs(((l9_106.w-l9_106.y)/((6.0*l9_107)+1e-07))+l9_106.z);
float l9_109=l9_106.x;
float3 l9_110=float3(l9_108,l9_107,l9_109);
float3 l9_111=l9_110;
float l9_112=l9_111.z-(l9_111.y*0.5);
float l9_113=l9_111.y/((1.0-abs((2.0*l9_112)-1.0))+1e-07);
float3 l9_114=float3(l9_111.x,l9_113,l9_112);
float3 l9_115=l9_114;
float l9_116=l9_115.x;
float3 l9_117=param_3;
float3 l9_118=l9_117;
float4 l9_119;
if (l9_118.y<l9_118.z)
{
l9_119=float4(l9_118.zy,-1.0,0.66666669);
}
else
{
l9_119=float4(l9_118.yz,0.0,-0.33333334);
}
float4 l9_120=l9_119;
float4 l9_121;
if (l9_118.x<l9_120.x)
{
l9_121=float4(l9_120.xyw,l9_118.x);
}
else
{
l9_121=float4(l9_118.x,l9_120.yzx);
}
float4 l9_122=l9_121;
float l9_123=l9_122.x-fast::min(l9_122.w,l9_122.y);
float l9_124=abs(((l9_122.w-l9_122.y)/((6.0*l9_123)+1e-07))+l9_122.z);
float l9_125=l9_122.x;
float3 l9_126=float3(l9_124,l9_123,l9_125);
float3 l9_127=l9_126;
float l9_128=l9_127.z-(l9_127.y*0.5);
float l9_129=l9_127.y/((1.0-abs((2.0*l9_128)-1.0))+1e-07);
float3 l9_130=float3(l9_127.x,l9_129,l9_128);
float3 l9_131=float3(l9_116,l9_130.y,l9_115.z);
float l9_132=l9_131.x;
float l9_133=abs((6.0*l9_132)-3.0)-1.0;
float l9_134=2.0-abs((6.0*l9_132)-2.0);
float l9_135=2.0-abs((6.0*l9_132)-4.0);
float3 l9_136=fast::clamp(float3(l9_133,l9_134,l9_135),float3(0.0),float3(1.0));
float3 l9_137=l9_136;
float l9_138=(1.0-abs((2.0*l9_131.z)-1.0))*l9_131.y;
l9_137=((l9_137-float3(0.5))*l9_138)+float3(l9_131.z);
float3 l9_139=l9_137;
float3 l9_140=l9_139;
return l9_140;
}
else
{
if ((int(BLEND_MODE_COLOR_tmp)!=0))
{
float3 param_4=a;
float3 param_5=b;
float3 l9_141=param_5;
float3 l9_142=l9_141;
float4 l9_143;
if (l9_142.y<l9_142.z)
{
l9_143=float4(l9_142.zy,-1.0,0.66666669);
}
else
{
l9_143=float4(l9_142.yz,0.0,-0.33333334);
}
float4 l9_144=l9_143;
float4 l9_145;
if (l9_142.x<l9_144.x)
{
l9_145=float4(l9_144.xyw,l9_142.x);
}
else
{
l9_145=float4(l9_142.x,l9_144.yzx);
}
float4 l9_146=l9_145;
float l9_147=l9_146.x-fast::min(l9_146.w,l9_146.y);
float l9_148=abs(((l9_146.w-l9_146.y)/((6.0*l9_147)+1e-07))+l9_146.z);
float l9_149=l9_146.x;
float3 l9_150=float3(l9_148,l9_147,l9_149);
float3 l9_151=l9_150;
float l9_152=l9_151.z-(l9_151.y*0.5);
float l9_153=l9_151.y/((1.0-abs((2.0*l9_152)-1.0))+1e-07);
float3 l9_154=float3(l9_151.x,l9_153,l9_152);
float3 l9_155=l9_154;
float l9_156=l9_155.x;
float l9_157=l9_155.y;
float3 l9_158=param_4;
float3 l9_159=l9_158;
float4 l9_160;
if (l9_159.y<l9_159.z)
{
l9_160=float4(l9_159.zy,-1.0,0.66666669);
}
else
{
l9_160=float4(l9_159.yz,0.0,-0.33333334);
}
float4 l9_161=l9_160;
float4 l9_162;
if (l9_159.x<l9_161.x)
{
l9_162=float4(l9_161.xyw,l9_159.x);
}
else
{
l9_162=float4(l9_159.x,l9_161.yzx);
}
float4 l9_163=l9_162;
float l9_164=l9_163.x-fast::min(l9_163.w,l9_163.y);
float l9_165=abs(((l9_163.w-l9_163.y)/((6.0*l9_164)+1e-07))+l9_163.z);
float l9_166=l9_163.x;
float3 l9_167=float3(l9_165,l9_164,l9_166);
float3 l9_168=l9_167;
float l9_169=l9_168.z-(l9_168.y*0.5);
float l9_170=l9_168.y/((1.0-abs((2.0*l9_169)-1.0))+1e-07);
float3 l9_171=float3(l9_168.x,l9_170,l9_169);
float3 l9_172=float3(l9_156,l9_157,l9_171.z);
float l9_173=l9_172.x;
float l9_174=abs((6.0*l9_173)-3.0)-1.0;
float l9_175=2.0-abs((6.0*l9_173)-2.0);
float l9_176=2.0-abs((6.0*l9_173)-4.0);
float3 l9_177=fast::clamp(float3(l9_174,l9_175,l9_176),float3(0.0),float3(1.0));
float3 l9_178=l9_177;
float l9_179=(1.0-abs((2.0*l9_172.z)-1.0))*l9_172.y;
l9_178=((l9_178-float3(0.5))*l9_179)+float3(l9_172.z);
float3 l9_180=l9_178;
float3 l9_181=l9_180;
return l9_181;
}
else
{
if ((int(BLEND_MODE_LUMINOSITY_tmp)!=0))
{
float3 param_6=a;
float3 param_7=b;
float3 l9_182=param_6;
float3 l9_183=l9_182;
float4 l9_184;
if (l9_183.y<l9_183.z)
{
l9_184=float4(l9_183.zy,-1.0,0.66666669);
}
else
{
l9_184=float4(l9_183.yz,0.0,-0.33333334);
}
float4 l9_185=l9_184;
float4 l9_186;
if (l9_183.x<l9_185.x)
{
l9_186=float4(l9_185.xyw,l9_183.x);
}
else
{
l9_186=float4(l9_183.x,l9_185.yzx);
}
float4 l9_187=l9_186;
float l9_188=l9_187.x-fast::min(l9_187.w,l9_187.y);
float l9_189=abs(((l9_187.w-l9_187.y)/((6.0*l9_188)+1e-07))+l9_187.z);
float l9_190=l9_187.x;
float3 l9_191=float3(l9_189,l9_188,l9_190);
float3 l9_192=l9_191;
float l9_193=l9_192.z-(l9_192.y*0.5);
float l9_194=l9_192.y/((1.0-abs((2.0*l9_193)-1.0))+1e-07);
float3 l9_195=float3(l9_192.x,l9_194,l9_193);
float3 l9_196=l9_195;
float l9_197=l9_196.x;
float l9_198=l9_196.y;
float3 l9_199=param_7;
float3 l9_200=l9_199;
float4 l9_201;
if (l9_200.y<l9_200.z)
{
l9_201=float4(l9_200.zy,-1.0,0.66666669);
}
else
{
l9_201=float4(l9_200.yz,0.0,-0.33333334);
}
float4 l9_202=l9_201;
float4 l9_203;
if (l9_200.x<l9_202.x)
{
l9_203=float4(l9_202.xyw,l9_200.x);
}
else
{
l9_203=float4(l9_200.x,l9_202.yzx);
}
float4 l9_204=l9_203;
float l9_205=l9_204.x-fast::min(l9_204.w,l9_204.y);
float l9_206=abs(((l9_204.w-l9_204.y)/((6.0*l9_205)+1e-07))+l9_204.z);
float l9_207=l9_204.x;
float3 l9_208=float3(l9_206,l9_205,l9_207);
float3 l9_209=l9_208;
float l9_210=l9_209.z-(l9_209.y*0.5);
float l9_211=l9_209.y/((1.0-abs((2.0*l9_210)-1.0))+1e-07);
float3 l9_212=float3(l9_209.x,l9_211,l9_210);
float3 l9_213=float3(l9_197,l9_198,l9_212.z);
float l9_214=l9_213.x;
float l9_215=abs((6.0*l9_214)-3.0)-1.0;
float l9_216=2.0-abs((6.0*l9_214)-2.0);
float l9_217=2.0-abs((6.0*l9_214)-4.0);
float3 l9_218=fast::clamp(float3(l9_215,l9_216,l9_217),float3(0.0),float3(1.0));
float3 l9_219=l9_218;
float l9_220=(1.0-abs((2.0*l9_213.z)-1.0))*l9_213.y;
l9_219=((l9_219-float3(0.5))*l9_220)+float3(l9_213.z);
float3 l9_221=l9_219;
float3 l9_222=l9_221;
return l9_222;
}
else
{
float3 param_8=a;
float3 param_9=b;
float3 l9_223=param_8;
float l9_224=((0.29899999*l9_223.x)+(0.58700001*l9_223.y))+(0.114*l9_223.z);
float l9_225=l9_224;
float l9_226=1.0;
float l9_227=pow(l9_225,1.0/UserUniforms.correctedIntensity);
int l9_228;
if ((int(intensityTextureHasSwappedViews_tmp)!=0))
{
int l9_229=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_229=0;
}
else
{
l9_229=varStereoViewID;
}
int l9_230=l9_229;
l9_228=1-l9_230;
}
else
{
int l9_231=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_231=0;
}
else
{
l9_231=varStereoViewID;
}
int l9_232=l9_231;
l9_228=l9_232;
}
int l9_233=l9_228;
int l9_234=intensityTextureLayout_tmp;
int l9_235=l9_233;
float2 l9_236=float2(l9_227,0.5);
bool l9_237=(int(SC_USE_UV_TRANSFORM_intensityTexture_tmp)!=0);
float3x3 l9_238=UserUniforms.intensityTextureTransform;
int2 l9_239=int2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_intensityTexture_tmp);
bool l9_240=(int(SC_USE_UV_MIN_MAX_intensityTexture_tmp)!=0);
float4 l9_241=UserUniforms.intensityTextureUvMinMax;
bool l9_242=(int(SC_USE_CLAMP_TO_BORDER_intensityTexture_tmp)!=0);
float4 l9_243=UserUniforms.intensityTextureBorderColor;
float l9_244=0.0;
bool l9_245=l9_242&&(!l9_240);
float l9_246=1.0;
float l9_247=l9_236.x;
int l9_248=l9_239.x;
if (l9_248==1)
{
l9_247=fract(l9_247);
}
else
{
if (l9_248==2)
{
float l9_249=fract(l9_247);
float l9_250=l9_247-l9_249;
float l9_251=step(0.25,fract(l9_250*0.5));
l9_247=mix(l9_249,1.0-l9_249,fast::clamp(l9_251,0.0,1.0));
}
}
l9_236.x=l9_247;
float l9_252=l9_236.y;
int l9_253=l9_239.y;
if (l9_253==1)
{
l9_252=fract(l9_252);
}
else
{
if (l9_253==2)
{
float l9_254=fract(l9_252);
float l9_255=l9_252-l9_254;
float l9_256=step(0.25,fract(l9_255*0.5));
l9_252=mix(l9_254,1.0-l9_254,fast::clamp(l9_256,0.0,1.0));
}
}
l9_236.y=l9_252;
if (l9_240)
{
bool l9_257=l9_242;
bool l9_258;
if (l9_257)
{
l9_258=l9_239.x==3;
}
else
{
l9_258=l9_257;
}
float l9_259=l9_236.x;
float l9_260=l9_241.x;
float l9_261=l9_241.z;
bool l9_262=l9_258;
float l9_263=l9_246;
float l9_264=fast::clamp(l9_259,l9_260,l9_261);
float l9_265=step(abs(l9_259-l9_264),9.9999997e-06);
l9_263*=(l9_265+((1.0-float(l9_262))*(1.0-l9_265)));
l9_259=l9_264;
l9_236.x=l9_259;
l9_246=l9_263;
bool l9_266=l9_242;
bool l9_267;
if (l9_266)
{
l9_267=l9_239.y==3;
}
else
{
l9_267=l9_266;
}
float l9_268=l9_236.y;
float l9_269=l9_241.y;
float l9_270=l9_241.w;
bool l9_271=l9_267;
float l9_272=l9_246;
float l9_273=fast::clamp(l9_268,l9_269,l9_270);
float l9_274=step(abs(l9_268-l9_273),9.9999997e-06);
l9_272*=(l9_274+((1.0-float(l9_271))*(1.0-l9_274)));
l9_268=l9_273;
l9_236.y=l9_268;
l9_246=l9_272;
}
float2 l9_275=l9_236;
bool l9_276=l9_237;
float3x3 l9_277=l9_238;
if (l9_276)
{
l9_275=float2((l9_277*float3(l9_275,1.0)).xy);
}
float2 l9_278=l9_275;
l9_236=l9_278;
float l9_279=l9_236.x;
int l9_280=l9_239.x;
bool l9_281=l9_245;
float l9_282=l9_246;
if ((l9_280==0)||(l9_280==3))
{
float l9_283=l9_279;
float l9_284=0.0;
float l9_285=1.0;
bool l9_286=l9_281;
float l9_287=l9_282;
float l9_288=fast::clamp(l9_283,l9_284,l9_285);
float l9_289=step(abs(l9_283-l9_288),9.9999997e-06);
l9_287*=(l9_289+((1.0-float(l9_286))*(1.0-l9_289)));
l9_283=l9_288;
l9_279=l9_283;
l9_282=l9_287;
}
l9_236.x=l9_279;
l9_246=l9_282;
float l9_290=l9_236.y;
int l9_291=l9_239.y;
bool l9_292=l9_245;
float l9_293=l9_246;
if ((l9_291==0)||(l9_291==3))
{
float l9_294=l9_290;
float l9_295=0.0;
float l9_296=1.0;
bool l9_297=l9_292;
float l9_298=l9_293;
float l9_299=fast::clamp(l9_294,l9_295,l9_296);
float l9_300=step(abs(l9_294-l9_299),9.9999997e-06);
l9_298*=(l9_300+((1.0-float(l9_297))*(1.0-l9_300)));
l9_294=l9_299;
l9_290=l9_294;
l9_293=l9_298;
}
l9_236.y=l9_290;
l9_246=l9_293;
float2 l9_301=l9_236;
int l9_302=l9_234;
int l9_303=l9_235;
float l9_304=l9_244;
float2 l9_305=l9_301;
int l9_306=l9_302;
int l9_307=l9_303;
float3 l9_308=float3(0.0);
if (l9_306==0)
{
l9_308=float3(l9_305,0.0);
}
else
{
if (l9_306==1)
{
l9_308=float3(l9_305.x,(l9_305.y*0.5)+(0.5-(float(l9_307)*0.5)),0.0);
}
else
{
l9_308=float3(l9_305,float(l9_307));
}
}
float3 l9_309=l9_308;
float3 l9_310=l9_309;
float4 l9_311=intensityTexture.sample(intensityTextureSmpSC,l9_310.xy,bias(l9_304));
float4 l9_312=l9_311;
if (l9_242)
{
l9_312=mix(l9_243,l9_312,float4(l9_246));
}
float4 l9_313=l9_312;
float3 l9_314=l9_313.xyz;
float3 l9_315=l9_314;
float l9_316=16.0;
float l9_317=((((l9_315.x*256.0)+l9_315.y)+(l9_315.z/256.0))/257.00391)*l9_316;
float l9_318=l9_317;
if ((int(BLEND_MODE_FORGRAY_tmp)!=0))
{
l9_318=fast::max(l9_318,1.0);
}
if ((int(BLEND_MODE_NOTBRIGHT_tmp)!=0))
{
l9_318=fast::min(l9_318,1.0);
}
float l9_319=l9_225;
float3 l9_320=param_8;
float3 l9_321=param_9;
float l9_322=l9_226;
float l9_323=l9_318;
float3 l9_324=transformColor(l9_319,l9_320,l9_321,l9_322,l9_323);
return l9_324;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
float4 sc_OutputMotionVectorIfNeeded(thread const float4& finalColor,thread float4& varPosAndMotion,thread float4& varNormalAndMotion)
{
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
float2 param=float2(varPosAndMotion.w,varNormalAndMotion.w);
float l9_0=(param.x*5.0)+0.5;
float l9_1=floor(l9_0*65535.0);
float l9_2=floor(l9_1*0.00390625);
float2 l9_3=float2(l9_2/255.0,(l9_1-(l9_2*256.0))/255.0);
float l9_4=(param.y*5.0)+0.5;
float l9_5=floor(l9_4*65535.0);
float l9_6=floor(l9_5*0.00390625);
float2 l9_7=float2(l9_6/255.0,(l9_5-(l9_6*256.0))/255.0);
float4 l9_8=float4(l9_3,l9_7);
return l9_8;
}
else
{
return finalColor;
}
}
fragment main_frag_out main_frag(main_frag_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]],float4 gl_FragCoord [[position]])
{
main_frag_out out={};
int N46_stops=0;
int N46_type=0;
float2 N46_uv=float2(0.0);
float4 N46_backgroundColor=float4(0.0);
float N46_linearGradientStart=0.0;
float N46_linearGradientAngle=0.0;
float N46_linearGradientLength=0.0;
float2 N46_gradientStartPosition=float2(0.0);
float N46_radialGradientLength=0.0;
float N46_rectDist=0.0;
float4 N46_OutColor=float4(0.0);
int N80_textureWrap=0;
float N80_useTexture=0.0;
float2 N80_textureMode=float2(0.0);
float2 N80_uv=float2(0.0);
float4 N80_backgroundColor=float4(0.0);
float4 N80_outColor=float4(0.0);
int N7_useBorder=0;
float N7_radius=0.0;
float N7_borderSize=0.0;
float N7_borderSoftness=0.0;
float2 N7_position=float2(0.0);
float2 N7_scale=float2(0.0);
float N7_dist=0.0;
float N7_rawDist=0.0;
bool N81_borderOnly=false;
float2 N81_uv=float2(0.0);
float2 N81_size=float2(0.0);
float N81_cursorLength=0.0;
float N81_isHovered=0.0;
float N81_isCenter=0.0;
float N81_isZone=0.0;
float N81_dotsStop1=0.0;
float N81_dotsStop2=0.0;
float N81_circleScalar=0.0;
float N81_circle=0.0;
bool N114_borderOnly=false;
bool N114_cutOutCenter=false;
float2 N114_uv=float2(0.0);
float2 N114_size=float2(0.0);
float N114_margin=0.0;
float N114_isCenter=0.0;
float N102_grabZonesCount=0.0;
float2 N102_uv=float2(0.0);
float2 N102_size=float2(0.0);
float N102_isZone=0.0;
int N67_stops=0;
int N67_type=0;
float2 N67_uv=float2(0.0);
float4 N67_backgroundColor=float4(0.0);
float N67_linearGradientStart=0.0;
float N67_linearGradientAngle=0.0;
float N67_linearGradientLength=0.0;
float2 N67_gradientStartPosition=float2(0.0);
float N67_radialGradientLength=0.0;
float N67_rectDist=0.0;
float4 N67_OutColor=float4(0.0);
if ((int(sc_DepthOnly_tmp)!=0))
{
return out;
}
if ((sc_StereoRenderingMode_tmp==1)&&(sc_StereoRendering_IsClipDistanceEnabled_tmp==0))
{
if (in.varClipDistance<0.0)
{
discard_fragment();
}
}
ssPreviewInfo PreviewInfo;
PreviewInfo.Color=in.PreviewVertexColor;
PreviewInfo.Saved=((in.PreviewVertexSaved*1.0)!=0.0) ? true : false;
float4 FinalColor=float4(1.0);
ssGlobals Globals;
Globals.gTimeElapsed=(*sc_set0.UserUniforms).sc_Time.x;
Globals.gTimeDelta=(*sc_set0.UserUniforms).sc_Time.y;
Globals.SurfacePosition_ObjectSpace=((*sc_set0.UserUniforms).sc_ModelMatrixInverse*float4(in.varPosAndMotion.xyz,1.0)).xyz;
float3 Position_N13=float3(0.0);
Position_N13=Globals.SurfacePosition_ObjectSpace;
float2 Output_N36=float2(0.0);
float2 param=(*sc_set0.UserUniforms).size;
Output_N36=param;
float2 Value_N23=float2(0.0);
Value_N23=Output_N36;
float Value1_N37=0.0;
float Value2_N37=0.0;
float2 param_1=Value_N23;
float param_2=param_1.x;
float param_3=param_1.y;
Value1_N37=param_2;
Value2_N37=param_3;
float2 Value_N14=float2(0.0);
Value_N14.x=Value1_N37;
Value_N14.y=Value2_N37;
float Output_N33=0.0;
float param_4=(*sc_set0.UserUniforms).cornerRadius;
Output_N33=param_4;
float Value_N24=0.0;
Value_N24=Output_N33;
float Output_N35=0.0;
Output_N35=Value_N24-1.0;
float Output_N32=0.0;
Output_N32=Output_N35*(*sc_set0.UserUniforms).Port_Input1_N032;
float2 Output_N34=float2(0.0);
Output_N34=Value_N14-float2(Output_N32);
float2 Output_N25=float2(0.0);
Output_N25=Output_N34*(*sc_set0.UserUniforms).Port_Input1_N025;
float2 Output_N31=float2(0.0);
Output_N31=Position_N13.xy+Output_N25;
float Value1_N15=0.0;
float Value2_N15=0.0;
float2 param_5=Output_N34;
float param_6=param_5.x;
float param_7=param_5.y;
Value1_N15=param_6;
Value2_N15=param_7;
float Output_N16=0.0;
Output_N16=(*sc_set0.UserUniforms).Port_Input0_N016*Value1_N15;
float Output_N17=0.0;
Output_N17=(*sc_set0.UserUniforms).Port_Input0_N017*Value2_N15;
float2 Value_N19=float2(0.0);
Value_N19.x=Output_N16;
Value_N19.y=Output_N17;
float2 Output_N18=float2(0.0);
Output_N18=Output_N31+Value_N19;
float2 Output_N26=float2(0.0);
Output_N26=Output_N25+float2(Value_N24);
float2 Output_N22=float2(0.0);
Output_N22=Output_N18/(Output_N26+float2(1.234e-06));
float2 Export_N38=float2(0.0);
Export_N38=Output_N22;
float Output_N77=0.0;
float param_8=(*sc_set0.UserUniforms).useTexture;
Output_N77=param_8;
float2 Output_N79=float2(0.0);
float2 param_9=(*sc_set0.UserUniforms).textureMode;
Output_N79=param_9;
float Output_N73=0.0;
float param_10=(*sc_set0.UserUniforms).textureWrap;
Output_N73=param_10;
float4 Output_N40=float4(0.0);
float4 param_11=(*sc_set0.UserUniforms).backgroundColor;
Output_N40=param_11;
float4 outColor_N80=float4(0.0);
float param_12=Output_N77;
float2 param_13=Output_N79;
float param_14=Output_N73;
float2 param_15=Export_N38;
float4 param_16=Output_N40;
float4 param_17=float4(0.0);
N80_useTexture=param_12;
N80_textureMode=param_13;
N80_textureWrap=int(param_14);
N80_uv=param_15;
N80_backgroundColor=param_16;
if (N80_useTexture<1.0)
{
N80_outColor=N80_backgroundColor;
}
else
{
float2 l9_0=N80_uv*0.5;
l9_0*=N80_textureMode;
l9_0+=float2(0.5);
if (N80_textureWrap==0)
{
float l9_1=fast::max(step(1.0,l9_0.x),step(1.0,l9_0.y));
l9_1=fast::max(l9_1,step(l9_0.x,0.0));
l9_1=fast::max(l9_1,step(l9_0.y,0.0));
float2 l9_2=l9_0;
float4 l9_3=float4(0.0);
int l9_4;
if ((int(backgroundTextureHasSwappedViews_tmp)!=0))
{
int l9_5=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_5=0;
}
else
{
l9_5=in.varStereoViewID;
}
int l9_6=l9_5;
l9_4=1-l9_6;
}
else
{
int l9_7=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_7=0;
}
else
{
l9_7=in.varStereoViewID;
}
int l9_8=l9_7;
l9_4=l9_8;
}
int l9_9=l9_4;
int l9_10=backgroundTextureLayout_tmp;
int l9_11=l9_9;
float2 l9_12=l9_2;
bool l9_13=(int(SC_USE_UV_TRANSFORM_backgroundTexture_tmp)!=0);
float3x3 l9_14=(*sc_set0.UserUniforms).backgroundTextureTransform;
int2 l9_15=int2(SC_SOFTWARE_WRAP_MODE_U_backgroundTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_backgroundTexture_tmp);
bool l9_16=(int(SC_USE_UV_MIN_MAX_backgroundTexture_tmp)!=0);
float4 l9_17=(*sc_set0.UserUniforms).backgroundTextureUvMinMax;
bool l9_18=(int(SC_USE_CLAMP_TO_BORDER_backgroundTexture_tmp)!=0);
float4 l9_19=(*sc_set0.UserUniforms).backgroundTextureBorderColor;
float l9_20=0.0;
bool l9_21=l9_18&&(!l9_16);
float l9_22=1.0;
float l9_23=l9_12.x;
int l9_24=l9_15.x;
if (l9_24==1)
{
l9_23=fract(l9_23);
}
else
{
if (l9_24==2)
{
float l9_25=fract(l9_23);
float l9_26=l9_23-l9_25;
float l9_27=step(0.25,fract(l9_26*0.5));
l9_23=mix(l9_25,1.0-l9_25,fast::clamp(l9_27,0.0,1.0));
}
}
l9_12.x=l9_23;
float l9_28=l9_12.y;
int l9_29=l9_15.y;
if (l9_29==1)
{
l9_28=fract(l9_28);
}
else
{
if (l9_29==2)
{
float l9_30=fract(l9_28);
float l9_31=l9_28-l9_30;
float l9_32=step(0.25,fract(l9_31*0.5));
l9_28=mix(l9_30,1.0-l9_30,fast::clamp(l9_32,0.0,1.0));
}
}
l9_12.y=l9_28;
if (l9_16)
{
bool l9_33=l9_18;
bool l9_34;
if (l9_33)
{
l9_34=l9_15.x==3;
}
else
{
l9_34=l9_33;
}
float l9_35=l9_12.x;
float l9_36=l9_17.x;
float l9_37=l9_17.z;
bool l9_38=l9_34;
float l9_39=l9_22;
float l9_40=fast::clamp(l9_35,l9_36,l9_37);
float l9_41=step(abs(l9_35-l9_40),9.9999997e-06);
l9_39*=(l9_41+((1.0-float(l9_38))*(1.0-l9_41)));
l9_35=l9_40;
l9_12.x=l9_35;
l9_22=l9_39;
bool l9_42=l9_18;
bool l9_43;
if (l9_42)
{
l9_43=l9_15.y==3;
}
else
{
l9_43=l9_42;
}
float l9_44=l9_12.y;
float l9_45=l9_17.y;
float l9_46=l9_17.w;
bool l9_47=l9_43;
float l9_48=l9_22;
float l9_49=fast::clamp(l9_44,l9_45,l9_46);
float l9_50=step(abs(l9_44-l9_49),9.9999997e-06);
l9_48*=(l9_50+((1.0-float(l9_47))*(1.0-l9_50)));
l9_44=l9_49;
l9_12.y=l9_44;
l9_22=l9_48;
}
float2 l9_51=l9_12;
bool l9_52=l9_13;
float3x3 l9_53=l9_14;
if (l9_52)
{
l9_51=float2((l9_53*float3(l9_51,1.0)).xy);
}
float2 l9_54=l9_51;
l9_12=l9_54;
float l9_55=l9_12.x;
int l9_56=l9_15.x;
bool l9_57=l9_21;
float l9_58=l9_22;
if ((l9_56==0)||(l9_56==3))
{
float l9_59=l9_55;
float l9_60=0.0;
float l9_61=1.0;
bool l9_62=l9_57;
float l9_63=l9_58;
float l9_64=fast::clamp(l9_59,l9_60,l9_61);
float l9_65=step(abs(l9_59-l9_64),9.9999997e-06);
l9_63*=(l9_65+((1.0-float(l9_62))*(1.0-l9_65)));
l9_59=l9_64;
l9_55=l9_59;
l9_58=l9_63;
}
l9_12.x=l9_55;
l9_22=l9_58;
float l9_66=l9_12.y;
int l9_67=l9_15.y;
bool l9_68=l9_21;
float l9_69=l9_22;
if ((l9_67==0)||(l9_67==3))
{
float l9_70=l9_66;
float l9_71=0.0;
float l9_72=1.0;
bool l9_73=l9_68;
float l9_74=l9_69;
float l9_75=fast::clamp(l9_70,l9_71,l9_72);
float l9_76=step(abs(l9_70-l9_75),9.9999997e-06);
l9_74*=(l9_76+((1.0-float(l9_73))*(1.0-l9_76)));
l9_70=l9_75;
l9_66=l9_70;
l9_69=l9_74;
}
l9_12.y=l9_66;
l9_22=l9_69;
float2 l9_77=l9_12;
int l9_78=l9_10;
int l9_79=l9_11;
float l9_80=l9_20;
float2 l9_81=l9_77;
int l9_82=l9_78;
int l9_83=l9_79;
float3 l9_84=float3(0.0);
if (l9_82==0)
{
l9_84=float3(l9_81,0.0);
}
else
{
if (l9_82==1)
{
l9_84=float3(l9_81.x,(l9_81.y*0.5)+(0.5-(float(l9_83)*0.5)),0.0);
}
else
{
l9_84=float3(l9_81,float(l9_83));
}
}
float3 l9_85=l9_84;
float3 l9_86=l9_85;
float4 l9_87=sc_set0.backgroundTexture.sample(sc_set0.backgroundTextureSmpSC,l9_86.xy,bias(l9_80));
float4 l9_88=l9_87;
if (l9_18)
{
l9_88=mix(l9_19,l9_88,float4(l9_22));
}
float4 l9_89=l9_88;
l9_3=l9_89;
float4 l9_90=l9_3;
N80_outColor=mix(l9_90,N80_backgroundColor,float4(l9_1));
}
else
{
if (N80_textureWrap==2)
{
l9_0.x=fast::max(0.0,l9_0.x);
l9_0.x=fast::min(1.0,l9_0.x);
l9_0.y=fast::max(0.0,l9_0.y);
l9_0.y=fast::min(1.0,l9_0.y);
float2 l9_91=l9_0;
float4 l9_92=float4(0.0);
int l9_93;
if ((int(backgroundTextureHasSwappedViews_tmp)!=0))
{
int l9_94=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_94=0;
}
else
{
l9_94=in.varStereoViewID;
}
int l9_95=l9_94;
l9_93=1-l9_95;
}
else
{
int l9_96=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_96=0;
}
else
{
l9_96=in.varStereoViewID;
}
int l9_97=l9_96;
l9_93=l9_97;
}
int l9_98=l9_93;
int l9_99=backgroundTextureLayout_tmp;
int l9_100=l9_98;
float2 l9_101=l9_91;
bool l9_102=(int(SC_USE_UV_TRANSFORM_backgroundTexture_tmp)!=0);
float3x3 l9_103=(*sc_set0.UserUniforms).backgroundTextureTransform;
int2 l9_104=int2(SC_SOFTWARE_WRAP_MODE_U_backgroundTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_backgroundTexture_tmp);
bool l9_105=(int(SC_USE_UV_MIN_MAX_backgroundTexture_tmp)!=0);
float4 l9_106=(*sc_set0.UserUniforms).backgroundTextureUvMinMax;
bool l9_107=(int(SC_USE_CLAMP_TO_BORDER_backgroundTexture_tmp)!=0);
float4 l9_108=(*sc_set0.UserUniforms).backgroundTextureBorderColor;
float l9_109=0.0;
bool l9_110=l9_107&&(!l9_105);
float l9_111=1.0;
float l9_112=l9_101.x;
int l9_113=l9_104.x;
if (l9_113==1)
{
l9_112=fract(l9_112);
}
else
{
if (l9_113==2)
{
float l9_114=fract(l9_112);
float l9_115=l9_112-l9_114;
float l9_116=step(0.25,fract(l9_115*0.5));
l9_112=mix(l9_114,1.0-l9_114,fast::clamp(l9_116,0.0,1.0));
}
}
l9_101.x=l9_112;
float l9_117=l9_101.y;
int l9_118=l9_104.y;
if (l9_118==1)
{
l9_117=fract(l9_117);
}
else
{
if (l9_118==2)
{
float l9_119=fract(l9_117);
float l9_120=l9_117-l9_119;
float l9_121=step(0.25,fract(l9_120*0.5));
l9_117=mix(l9_119,1.0-l9_119,fast::clamp(l9_121,0.0,1.0));
}
}
l9_101.y=l9_117;
if (l9_105)
{
bool l9_122=l9_107;
bool l9_123;
if (l9_122)
{
l9_123=l9_104.x==3;
}
else
{
l9_123=l9_122;
}
float l9_124=l9_101.x;
float l9_125=l9_106.x;
float l9_126=l9_106.z;
bool l9_127=l9_123;
float l9_128=l9_111;
float l9_129=fast::clamp(l9_124,l9_125,l9_126);
float l9_130=step(abs(l9_124-l9_129),9.9999997e-06);
l9_128*=(l9_130+((1.0-float(l9_127))*(1.0-l9_130)));
l9_124=l9_129;
l9_101.x=l9_124;
l9_111=l9_128;
bool l9_131=l9_107;
bool l9_132;
if (l9_131)
{
l9_132=l9_104.y==3;
}
else
{
l9_132=l9_131;
}
float l9_133=l9_101.y;
float l9_134=l9_106.y;
float l9_135=l9_106.w;
bool l9_136=l9_132;
float l9_137=l9_111;
float l9_138=fast::clamp(l9_133,l9_134,l9_135);
float l9_139=step(abs(l9_133-l9_138),9.9999997e-06);
l9_137*=(l9_139+((1.0-float(l9_136))*(1.0-l9_139)));
l9_133=l9_138;
l9_101.y=l9_133;
l9_111=l9_137;
}
float2 l9_140=l9_101;
bool l9_141=l9_102;
float3x3 l9_142=l9_103;
if (l9_141)
{
l9_140=float2((l9_142*float3(l9_140,1.0)).xy);
}
float2 l9_143=l9_140;
l9_101=l9_143;
float l9_144=l9_101.x;
int l9_145=l9_104.x;
bool l9_146=l9_110;
float l9_147=l9_111;
if ((l9_145==0)||(l9_145==3))
{
float l9_148=l9_144;
float l9_149=0.0;
float l9_150=1.0;
bool l9_151=l9_146;
float l9_152=l9_147;
float l9_153=fast::clamp(l9_148,l9_149,l9_150);
float l9_154=step(abs(l9_148-l9_153),9.9999997e-06);
l9_152*=(l9_154+((1.0-float(l9_151))*(1.0-l9_154)));
l9_148=l9_153;
l9_144=l9_148;
l9_147=l9_152;
}
l9_101.x=l9_144;
l9_111=l9_147;
float l9_155=l9_101.y;
int l9_156=l9_104.y;
bool l9_157=l9_110;
float l9_158=l9_111;
if ((l9_156==0)||(l9_156==3))
{
float l9_159=l9_155;
float l9_160=0.0;
float l9_161=1.0;
bool l9_162=l9_157;
float l9_163=l9_158;
float l9_164=fast::clamp(l9_159,l9_160,l9_161);
float l9_165=step(abs(l9_159-l9_164),9.9999997e-06);
l9_163*=(l9_165+((1.0-float(l9_162))*(1.0-l9_165)));
l9_159=l9_164;
l9_155=l9_159;
l9_158=l9_163;
}
l9_101.y=l9_155;
l9_111=l9_158;
float2 l9_166=l9_101;
int l9_167=l9_99;
int l9_168=l9_100;
float l9_169=l9_109;
float2 l9_170=l9_166;
int l9_171=l9_167;
int l9_172=l9_168;
float3 l9_173=float3(0.0);
if (l9_171==0)
{
l9_173=float3(l9_170,0.0);
}
else
{
if (l9_171==1)
{
l9_173=float3(l9_170.x,(l9_170.y*0.5)+(0.5-(float(l9_172)*0.5)),0.0);
}
else
{
l9_173=float3(l9_170,float(l9_172));
}
}
float3 l9_174=l9_173;
float3 l9_175=l9_174;
float4 l9_176=sc_set0.backgroundTexture.sample(sc_set0.backgroundTextureSmpSC,l9_175.xy,bias(l9_169));
float4 l9_177=l9_176;
if (l9_107)
{
l9_177=mix(l9_108,l9_177,float4(l9_111));
}
float4 l9_178=l9_177;
l9_92=l9_178;
float4 l9_179=l9_92;
N80_outColor=l9_179;
}
else
{
float2 l9_180=l9_0;
float4 l9_181=float4(0.0);
int l9_182;
if ((int(backgroundTextureHasSwappedViews_tmp)!=0))
{
int l9_183=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_183=0;
}
else
{
l9_183=in.varStereoViewID;
}
int l9_184=l9_183;
l9_182=1-l9_184;
}
else
{
int l9_185=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_185=0;
}
else
{
l9_185=in.varStereoViewID;
}
int l9_186=l9_185;
l9_182=l9_186;
}
int l9_187=l9_182;
int l9_188=backgroundTextureLayout_tmp;
int l9_189=l9_187;
float2 l9_190=l9_180;
bool l9_191=(int(SC_USE_UV_TRANSFORM_backgroundTexture_tmp)!=0);
float3x3 l9_192=(*sc_set0.UserUniforms).backgroundTextureTransform;
int2 l9_193=int2(SC_SOFTWARE_WRAP_MODE_U_backgroundTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_backgroundTexture_tmp);
bool l9_194=(int(SC_USE_UV_MIN_MAX_backgroundTexture_tmp)!=0);
float4 l9_195=(*sc_set0.UserUniforms).backgroundTextureUvMinMax;
bool l9_196=(int(SC_USE_CLAMP_TO_BORDER_backgroundTexture_tmp)!=0);
float4 l9_197=(*sc_set0.UserUniforms).backgroundTextureBorderColor;
float l9_198=0.0;
bool l9_199=l9_196&&(!l9_194);
float l9_200=1.0;
float l9_201=l9_190.x;
int l9_202=l9_193.x;
if (l9_202==1)
{
l9_201=fract(l9_201);
}
else
{
if (l9_202==2)
{
float l9_203=fract(l9_201);
float l9_204=l9_201-l9_203;
float l9_205=step(0.25,fract(l9_204*0.5));
l9_201=mix(l9_203,1.0-l9_203,fast::clamp(l9_205,0.0,1.0));
}
}
l9_190.x=l9_201;
float l9_206=l9_190.y;
int l9_207=l9_193.y;
if (l9_207==1)
{
l9_206=fract(l9_206);
}
else
{
if (l9_207==2)
{
float l9_208=fract(l9_206);
float l9_209=l9_206-l9_208;
float l9_210=step(0.25,fract(l9_209*0.5));
l9_206=mix(l9_208,1.0-l9_208,fast::clamp(l9_210,0.0,1.0));
}
}
l9_190.y=l9_206;
if (l9_194)
{
bool l9_211=l9_196;
bool l9_212;
if (l9_211)
{
l9_212=l9_193.x==3;
}
else
{
l9_212=l9_211;
}
float l9_213=l9_190.x;
float l9_214=l9_195.x;
float l9_215=l9_195.z;
bool l9_216=l9_212;
float l9_217=l9_200;
float l9_218=fast::clamp(l9_213,l9_214,l9_215);
float l9_219=step(abs(l9_213-l9_218),9.9999997e-06);
l9_217*=(l9_219+((1.0-float(l9_216))*(1.0-l9_219)));
l9_213=l9_218;
l9_190.x=l9_213;
l9_200=l9_217;
bool l9_220=l9_196;
bool l9_221;
if (l9_220)
{
l9_221=l9_193.y==3;
}
else
{
l9_221=l9_220;
}
float l9_222=l9_190.y;
float l9_223=l9_195.y;
float l9_224=l9_195.w;
bool l9_225=l9_221;
float l9_226=l9_200;
float l9_227=fast::clamp(l9_222,l9_223,l9_224);
float l9_228=step(abs(l9_222-l9_227),9.9999997e-06);
l9_226*=(l9_228+((1.0-float(l9_225))*(1.0-l9_228)));
l9_222=l9_227;
l9_190.y=l9_222;
l9_200=l9_226;
}
float2 l9_229=l9_190;
bool l9_230=l9_191;
float3x3 l9_231=l9_192;
if (l9_230)
{
l9_229=float2((l9_231*float3(l9_229,1.0)).xy);
}
float2 l9_232=l9_229;
l9_190=l9_232;
float l9_233=l9_190.x;
int l9_234=l9_193.x;
bool l9_235=l9_199;
float l9_236=l9_200;
if ((l9_234==0)||(l9_234==3))
{
float l9_237=l9_233;
float l9_238=0.0;
float l9_239=1.0;
bool l9_240=l9_235;
float l9_241=l9_236;
float l9_242=fast::clamp(l9_237,l9_238,l9_239);
float l9_243=step(abs(l9_237-l9_242),9.9999997e-06);
l9_241*=(l9_243+((1.0-float(l9_240))*(1.0-l9_243)));
l9_237=l9_242;
l9_233=l9_237;
l9_236=l9_241;
}
l9_190.x=l9_233;
l9_200=l9_236;
float l9_244=l9_190.y;
int l9_245=l9_193.y;
bool l9_246=l9_199;
float l9_247=l9_200;
if ((l9_245==0)||(l9_245==3))
{
float l9_248=l9_244;
float l9_249=0.0;
float l9_250=1.0;
bool l9_251=l9_246;
float l9_252=l9_247;
float l9_253=fast::clamp(l9_248,l9_249,l9_250);
float l9_254=step(abs(l9_248-l9_253),9.9999997e-06);
l9_252*=(l9_254+((1.0-float(l9_251))*(1.0-l9_254)));
l9_248=l9_253;
l9_244=l9_248;
l9_247=l9_252;
}
l9_190.y=l9_244;
l9_200=l9_247;
float2 l9_255=l9_190;
int l9_256=l9_188;
int l9_257=l9_189;
float l9_258=l9_198;
float2 l9_259=l9_255;
int l9_260=l9_256;
int l9_261=l9_257;
float3 l9_262=float3(0.0);
if (l9_260==0)
{
l9_262=float3(l9_259,0.0);
}
else
{
if (l9_260==1)
{
l9_262=float3(l9_259.x,(l9_259.y*0.5)+(0.5-(float(l9_261)*0.5)),0.0);
}
else
{
l9_262=float3(l9_259,float(l9_261));
}
}
float3 l9_263=l9_262;
float3 l9_264=l9_263;
float4 l9_265=sc_set0.backgroundTexture.sample(sc_set0.backgroundTextureSmpSC,l9_264.xy,bias(l9_258));
float4 l9_266=l9_265;
if (l9_196)
{
l9_266=mix(l9_197,l9_266,float4(l9_200));
}
float4 l9_267=l9_266;
l9_181=l9_267;
float4 l9_268=l9_181;
N80_outColor=l9_268;
}
}
}
param_17=N80_outColor;
outColor_N80=param_17;
float Output_N45=0.0;
float param_18=float((*sc_set0.UserUniforms).stops);
Output_N45=param_18;
float Output_N48=0.0;
float param_19=(*sc_set0.UserUniforms).linearGradientStart;
Output_N48=param_19;
float Output_N50=0.0;
float param_20=(*sc_set0.UserUniforms).linearGradientAngle;
Output_N50=param_20;
float Output_N51=0.0;
float param_21=(*sc_set0.UserUniforms).linearGradientLength;
Output_N51=param_21;
float2 Output_N53=float2(0.0);
float2 param_22=(*sc_set0.UserUniforms).gradientStartPosition;
Output_N53=param_22;
float Output_N55=0.0;
float param_23=(*sc_set0.UserUniforms).radialGradientLength;
Output_N55=param_23;
float Output_N71=0.0;
float param_24=(*sc_set0.UserUniforms).border;
Output_N71=param_24;
float Output_N43=0.0;
Output_N43=(*sc_set0.UserUniforms).Port_Input0_N043*Output_N33;
float Output_N42=0.0;
float param_25=(*sc_set0.UserUniforms).borderSize;
Output_N42=param_25;
float Output_N69=0.0;
Output_N69=(*sc_set0.UserUniforms).Port_Input0_N069*Output_N42;
float Output_N44=0.0;
Output_N44=Output_N43-Output_N69;
float Output_N68=0.0;
Output_N68=fast::max(Output_N44,(*sc_set0.UserUniforms).Port_Input1_N068);
float dist_N7=0.0;
float rawDist_N7=0.0;
float param_26=Output_N71;
float param_27=Output_N68;
float param_28=Output_N69;
float param_29=(*sc_set0.UserUniforms).Port_borderSoftness_N007;
float2 param_30=Export_N38;
float2 param_31=Output_N36;
float param_32=0.0;
float param_33=0.0;
N7_useBorder=int(param_26);
N7_radius=param_27;
N7_borderSize=param_28;
N7_borderSoftness=param_29;
N7_position=param_30;
N7_scale=param_31;
if (N7_useBorder==1)
{
float2 l9_269=N7_scale;
float2 l9_270=N7_position*(N7_scale+float2(2.0));
float2 l9_271=l9_270;
float2 l9_272=l9_269;
float l9_273=length(fast::max(((((abs(l9_271)-l9_272)+float2(N7_radius))+float2(N7_borderSize))-float2(2.0))+float2(N7_borderSoftness),float2(0.0)))-N7_radius;
N7_dist=l9_273;
N7_rawDist=N7_dist;
N7_dist=smoothstep(0.0,N7_borderSoftness*2.0,N7_dist);
if (N7_borderSize==0.0)
{
N7_dist=0.0;
}
}
else
{
N7_dist=0.0;
N7_rawDist=0.0;
}
param_32=N7_dist;
param_33=N7_rawDist;
dist_N7=param_32;
rawDist_N7=param_33;
float Output_N54=0.0;
float param_34=(*sc_set0.UserUniforms).gradientType;
Output_N54=param_34;
float4 OutColor_N46=float4(0.0);
float2 param_35=Export_N38;
float4 param_36=outColor_N80;
float param_37=Output_N45;
float param_38=Output_N48;
float param_39=Output_N50;
float param_40=Output_N51;
float2 param_41=Output_N53;
float param_42=Output_N55;
float param_43=rawDist_N7;
float param_44=Output_N54;
float4 param_45=float4(0.0);
N46_uv=param_35;
N46_backgroundColor=param_36;
N46_stops=int(param_37);
N46_linearGradientStart=param_38;
N46_linearGradientAngle=param_39;
N46_linearGradientLength=param_40;
N46_gradientStartPosition=param_41;
N46_radialGradientLength=param_42;
N46_rectDist=param_43;
N46_type=int(param_44);
if (N46_stops>0)
{
if (N46_type==0)
{
float l9_274=(N46_uv.x*cos(-N46_linearGradientAngle))-(N46_uv.y*sin(-N46_linearGradientAngle));
int l9_275=0;
float4 l9_276=float4(0.0);
l9_276=(*sc_set0.UserUniforms).colors[clamp(l9_275,0,5)];
float4 l9_277=l9_276;
N46_OutColor=l9_277;
int l9_278=1;
float4 l9_279=float4(0.0);
l9_279=(*sc_set0.UserUniforms).colors[clamp(l9_278,0,5)];
float4 l9_280=l9_279;
int l9_281=0;
float l9_282=0.0;
l9_282=(*sc_set0.UserUniforms).percents[clamp(l9_281,0,5)];
float l9_283=l9_282;
int l9_284=1;
float l9_285=0.0;
l9_285=(*sc_set0.UserUniforms).percents[clamp(l9_284,0,5)];
float l9_286=l9_285;
N46_OutColor=mix(N46_OutColor,l9_280,float4(smoothstep(N46_linearGradientStart+(l9_283*N46_linearGradientLength),N46_linearGradientStart+(l9_286*N46_linearGradientLength),l9_274)));
if (N46_stops>2)
{
int l9_287=1;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_287<(N46_stops-1))
{
int l9_288=l9_287+1;
float4 l9_289=float4(0.0);
l9_289=(*sc_set0.UserUniforms).colors[clamp(l9_288,0,5)];
float4 l9_290=l9_289;
int l9_291=l9_287;
float l9_292=0.0;
l9_292=(*sc_set0.UserUniforms).percents[clamp(l9_291,0,5)];
float l9_293=l9_292;
int l9_294=l9_287+1;
float l9_295=0.0;
l9_295=(*sc_set0.UserUniforms).percents[clamp(l9_294,0,5)];
float l9_296=l9_295;
N46_OutColor=mix(N46_OutColor,l9_290,float4(smoothstep(N46_linearGradientStart+(l9_293*N46_linearGradientLength),N46_linearGradientStart+(l9_296*N46_linearGradientLength),l9_274)));
l9_287++;
continue;
}
else
{
break;
}
}
}
}
else
{
if (N46_type==1)
{
float l9_297=(distance(N46_uv,N46_gradientStartPosition)/N46_radialGradientLength)*0.5;
int l9_298=0;
float4 l9_299=float4(0.0);
l9_299=(*sc_set0.UserUniforms).colors[clamp(l9_298,0,5)];
float4 l9_300=l9_299;
N46_OutColor=l9_300;
int l9_301=1;
float4 l9_302=float4(0.0);
l9_302=(*sc_set0.UserUniforms).colors[clamp(l9_301,0,5)];
float4 l9_303=l9_302;
int l9_304=0;
float l9_305=0.0;
l9_305=(*sc_set0.UserUniforms).percents[clamp(l9_304,0,5)];
float l9_306=l9_305;
int l9_307=1;
float l9_308=0.0;
l9_308=(*sc_set0.UserUniforms).percents[clamp(l9_307,0,5)];
float l9_309=l9_308;
N46_OutColor=mix(N46_OutColor,l9_303,float4(smoothstep(l9_306,l9_309,l9_297)));
if (N46_stops>2)
{
int l9_310=1;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_310<(N46_stops-1))
{
int l9_311=l9_310+1;
float4 l9_312=float4(0.0);
l9_312=(*sc_set0.UserUniforms).colors[clamp(l9_311,0,5)];
float4 l9_313=l9_312;
int l9_314=l9_310;
float l9_315=0.0;
l9_315=(*sc_set0.UserUniforms).percents[clamp(l9_314,0,5)];
float l9_316=l9_315;
int l9_317=l9_310+1;
float l9_318=0.0;
l9_318=(*sc_set0.UserUniforms).percents[clamp(l9_317,0,5)];
float l9_319=l9_318;
N46_OutColor=mix(N46_OutColor,l9_313,float4(smoothstep(l9_316,l9_319,l9_297)));
l9_310++;
continue;
}
else
{
break;
}
}
}
}
else
{
if (N46_type==2)
{
float l9_320=1.0-(N46_rectDist*(-1.0));
int l9_321=0;
float4 l9_322=float4(0.0);
l9_322=(*sc_set0.UserUniforms).colors[clamp(l9_321,0,5)];
float4 l9_323=l9_322;
N46_OutColor=l9_323;
int l9_324=1;
float4 l9_325=float4(0.0);
l9_325=(*sc_set0.UserUniforms).colors[clamp(l9_324,0,5)];
float4 l9_326=l9_325;
int l9_327=0;
float l9_328=0.0;
l9_328=(*sc_set0.UserUniforms).percents[clamp(l9_327,0,5)];
float l9_329=l9_328;
int l9_330=1;
float l9_331=0.0;
l9_331=(*sc_set0.UserUniforms).percents[clamp(l9_330,0,5)];
float l9_332=l9_331;
N46_OutColor=mix(N46_OutColor,l9_326,float4(smoothstep(l9_329,l9_332,l9_320)));
if (N46_stops>2)
{
int l9_333=1;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_333<(N46_stops-1))
{
int l9_334=l9_333+1;
float4 l9_335=float4(0.0);
l9_335=(*sc_set0.UserUniforms).colors[clamp(l9_334,0,5)];
float4 l9_336=l9_335;
int l9_337=l9_333;
float l9_338=0.0;
l9_338=(*sc_set0.UserUniforms).percents[clamp(l9_337,0,5)];
float l9_339=l9_338;
int l9_340=l9_333+1;
float l9_341=0.0;
l9_341=(*sc_set0.UserUniforms).percents[clamp(l9_340,0,5)];
float l9_342=l9_341;
N46_OutColor=mix(N46_OutColor,l9_336,float4(smoothstep(l9_339,l9_342,l9_320)));
l9_333++;
continue;
}
else
{
break;
}
}
}
}
}
}
}
else
{
N46_OutColor=N46_backgroundColor;
}
param_45=N46_OutColor;
OutColor_N46=param_45;
float4 Output_N123=float4(0.0);
float4 param_46=(*sc_set0.UserUniforms).highlightColorStop2;
Output_N123=param_46;
float4 Output_N124=float4(0.0);
float4 param_47=(*sc_set0.UserUniforms).highlightColorStop1;
Output_N124=param_47;
float Output_N107=0.0;
float param_48=(*sc_set0.UserUniforms).highlightStop1;
Output_N107=param_48;
float Output_N108=0.0;
float param_49=(*sc_set0.UserUniforms).highlightStop2;
Output_N108=param_49;
float2 Output_N85=float2(0.0);
float2 param_50=(*sc_set0.UserUniforms).cursorPosition;
Output_N85=param_50;
float2 Output_N87=float2(0.0);
Output_N87=Export_N38-Output_N85;
float Output_N97=0.0;
float param_51=(*sc_set0.UserUniforms).highlightSize;
Output_N97=param_51;
float Output_N105=0.0;
Output_N105=Output_N97+(*sc_set0.UserUniforms).Port_Input1_N105;
float Output_N106=0.0;
Output_N106=fast::max(Output_N105,(*sc_set0.UserUniforms).Port_Input1_N106);
float2 Output_N94=float2(0.0);
Output_N94=Output_N87/(float2(Output_N106)+float2(1.234e-06));
float2 Output_N95=float2(0.0);
Output_N95=Output_N94*Output_N36;
float Output_N86=0.0;
Output_N86=length(Output_N95);
float Output_N93=0.0;
Output_N93=smoothstep(Output_N107,Output_N108,Output_N86);
float Output_N122=0.0;
float l9_343;
if (Output_N93<=0.0)
{
l9_343=0.0;
}
else
{
l9_343=pow(Output_N93,(*sc_set0.UserUniforms).Port_Input1_N122);
}
Output_N122=l9_343;
float4 Output_N125=float4(0.0);
Output_N125=mix(Output_N123,Output_N124,float4(Output_N122));
float4 Output_N121=float4(0.0);
float4 param_52=(*sc_set0.UserUniforms).highlightActiveColorStop2;
Output_N121=param_52;
float4 Output_N96=float4(0.0);
float4 param_53=(*sc_set0.UserUniforms).highlightActiveColorStop1;
Output_N96=param_53;
float4 Output_N120=float4(0.0);
Output_N120=mix(Output_N121,Output_N96,float4(Output_N122));
float Output_N103=0.0;
float param_54=(*sc_set0.UserUniforms).isActive;
Output_N103=param_54;
float4 Output_N84=float4(0.0);
Output_N84=mix(Output_N125,Output_N120,float4(Output_N103));
float Output_N98=0.0;
float param_55=(*sc_set0.UserUniforms).isHovered;
Output_N98=param_55;
float Output_N100=0.0;
Output_N100=Output_N93*Output_N98;
float4 Output_N91=float4(0.0);
Output_N91=mix(OutColor_N46,Output_N84,float4(Output_N100));
float Output_N113=0.0;
float param_56=float((*sc_set0.UserUniforms).borderOnly!=0);
Output_N113=param_56;
float Output_N116=0.0;
float param_57=float((*sc_set0.UserUniforms).cutOutCenter!=0);
Output_N116=param_57;
float Output_N115=0.0;
float param_58=(*sc_set0.UserUniforms).frameBorder;
Output_N115=param_58;
float isCenter_N114=0.0;
float param_59=Output_N113;
float param_60=Output_N116;
float2 param_61=Export_N38;
float2 param_62=Output_N36;
float param_63=Output_N115;
float param_64=0.0;
N114_borderOnly=param_59!=0.0;
N114_cutOutCenter=param_60!=0.0;
N114_uv=param_61;
N114_size=param_62;
N114_margin=param_63;
N114_isCenter=1.0;
if (N114_cutOutCenter||N114_borderOnly)
{
float2 l9_344=(N114_size+float2(2.0))-float2(N114_margin*2.0);
float2 l9_345=(N114_uv*(N114_size+float2(2.0)))*0.5;
float2 l9_346=l9_345;
float2 l9_347=l9_344;
float l9_348=smoothstep((l9_347.x*(-0.5))-1.0,(l9_347.x*(-0.5))+1.0,l9_346.x);
l9_348*=smoothstep((l9_347.x*0.5)+1.0,(l9_347.x*0.5)-1.0,l9_346.x);
l9_348*=smoothstep((l9_347.y*(-0.5))-1.0,(l9_347.y*(-0.5))+1.0,l9_346.y);
l9_348*=smoothstep((l9_347.y*0.5)+1.0,(l9_347.y*0.5)-1.0,l9_346.y);
float l9_349=smoothstep(0.0,1.0,l9_348);
N114_isCenter=l9_349;
}
param_64=N114_isCenter;
isCenter_N114=param_64;
float Output_N104=0.0;
float param_65=(*sc_set0.UserUniforms).grabZonesCount;
Output_N104=param_65;
float isZone_N102=0.0;
float param_66=Output_N104;
float2 param_67=Export_N38;
float2 param_68=Output_N36;
float param_69=0.0;
N102_grabZonesCount=param_66;
N102_uv=param_67;
N102_size=param_68;
N102_isZone=0.0;
if (N102_grabZonesCount>0.0)
{
float2 l9_350=(N102_uv*(N102_size+float2(2.0)))*0.5;
int l9_351=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_351<int(N102_grabZonesCount))
{
int l9_352=l9_351;
float4 l9_353=float4(0.0);
l9_353=(*sc_set0.UserUniforms).grabZones[clamp(l9_352,0,7)];
float4 l9_354=l9_353;
float4 l9_355=l9_354;
float l9_356=smoothstep(l9_355.x-3.0,l9_355.x+3.0,l9_350.x);
l9_356*=smoothstep(l9_355.y-3.0,l9_355.y+3.0,l9_350.y);
l9_356*=smoothstep(l9_355.z+3.0,l9_355.z-3.0,l9_350.x);
l9_356*=smoothstep(l9_355.w+3.0,l9_355.w-3.0,l9_350.y);
N102_isZone+=smoothstep(0.0,1.0,l9_356);
l9_351++;
continue;
}
else
{
break;
}
}
}
param_69=N102_isZone;
isZone_N102=param_69;
float Output_N111=0.0;
float param_70=(*sc_set0.UserUniforms).dotsHighlightStop1;
Output_N111=param_70;
float Output_N112=0.0;
float param_71=(*sc_set0.UserUniforms).dotsHighlightStop2;
Output_N112=param_71;
float Output_N126=0.0;
float param_72=(*sc_set0.UserUniforms).dotsScalar;
Output_N126=param_72;
float circle_N81=0.0;
float2 param_73=Export_N38;
float2 param_74=Output_N36;
float param_75=Output_N86;
float param_76=Output_N98;
float param_77=isCenter_N114;
float param_78=isZone_N102;
float param_79=Output_N111;
float param_80=Output_N112;
float param_81=Output_N113;
float param_82=Output_N126;
float param_83=0.0;
N81_uv=param_73;
N81_size=param_74;
N81_cursorLength=param_75;
N81_isHovered=param_76;
N81_isCenter=param_77;
N81_isZone=param_78;
N81_dotsStop1=param_79;
N81_dotsStop2=param_80;
N81_borderOnly=param_81!=0.0;
N81_circleScalar=param_82;
N81_circle=0.0;
float l9_357=1.0;
if ((N81_isHovered!=0.0)||(N81_isZone!=0.0))
{
if (N81_borderOnly)
{
l9_357-=N81_isCenter;
}
float2 l9_358=N81_uv*float2(N81_circleScalar*N81_size.x,N81_circleScalar*N81_size.y);
float l9_359=0.0;
if (mod(l9_358.x,2.0)<1.0)
{
if (mod(l9_358.y+1.0,2.0)<1.0)
{
float l9_360=smoothstep(N81_dotsStop1,N81_dotsStop2,N81_cursorLength);
l9_360*=N81_isHovered;
l9_360+=N81_isZone;
float2 l9_361=l9_358;
float4 l9_362=float4(0.0);
int l9_363;
if ((int(circleTextureHasSwappedViews_tmp)!=0))
{
int l9_364=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_364=0;
}
else
{
l9_364=in.varStereoViewID;
}
int l9_365=l9_364;
l9_363=1-l9_365;
}
else
{
int l9_366=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_366=0;
}
else
{
l9_366=in.varStereoViewID;
}
int l9_367=l9_366;
l9_363=l9_367;
}
int l9_368=l9_363;
int l9_369=circleTextureLayout_tmp;
int l9_370=l9_368;
float2 l9_371=l9_361;
bool l9_372=(int(SC_USE_UV_TRANSFORM_circleTexture_tmp)!=0);
float3x3 l9_373=(*sc_set0.UserUniforms).circleTextureTransform;
int2 l9_374=int2(SC_SOFTWARE_WRAP_MODE_U_circleTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_circleTexture_tmp);
bool l9_375=(int(SC_USE_UV_MIN_MAX_circleTexture_tmp)!=0);
float4 l9_376=(*sc_set0.UserUniforms).circleTextureUvMinMax;
bool l9_377=(int(SC_USE_CLAMP_TO_BORDER_circleTexture_tmp)!=0);
float4 l9_378=(*sc_set0.UserUniforms).circleTextureBorderColor;
float l9_379=0.0;
bool l9_380=l9_377&&(!l9_375);
float l9_381=1.0;
float l9_382=l9_371.x;
int l9_383=l9_374.x;
if (l9_383==1)
{
l9_382=fract(l9_382);
}
else
{
if (l9_383==2)
{
float l9_384=fract(l9_382);
float l9_385=l9_382-l9_384;
float l9_386=step(0.25,fract(l9_385*0.5));
l9_382=mix(l9_384,1.0-l9_384,fast::clamp(l9_386,0.0,1.0));
}
}
l9_371.x=l9_382;
float l9_387=l9_371.y;
int l9_388=l9_374.y;
if (l9_388==1)
{
l9_387=fract(l9_387);
}
else
{
if (l9_388==2)
{
float l9_389=fract(l9_387);
float l9_390=l9_387-l9_389;
float l9_391=step(0.25,fract(l9_390*0.5));
l9_387=mix(l9_389,1.0-l9_389,fast::clamp(l9_391,0.0,1.0));
}
}
l9_371.y=l9_387;
if (l9_375)
{
bool l9_392=l9_377;
bool l9_393;
if (l9_392)
{
l9_393=l9_374.x==3;
}
else
{
l9_393=l9_392;
}
float l9_394=l9_371.x;
float l9_395=l9_376.x;
float l9_396=l9_376.z;
bool l9_397=l9_393;
float l9_398=l9_381;
float l9_399=fast::clamp(l9_394,l9_395,l9_396);
float l9_400=step(abs(l9_394-l9_399),9.9999997e-06);
l9_398*=(l9_400+((1.0-float(l9_397))*(1.0-l9_400)));
l9_394=l9_399;
l9_371.x=l9_394;
l9_381=l9_398;
bool l9_401=l9_377;
bool l9_402;
if (l9_401)
{
l9_402=l9_374.y==3;
}
else
{
l9_402=l9_401;
}
float l9_403=l9_371.y;
float l9_404=l9_376.y;
float l9_405=l9_376.w;
bool l9_406=l9_402;
float l9_407=l9_381;
float l9_408=fast::clamp(l9_403,l9_404,l9_405);
float l9_409=step(abs(l9_403-l9_408),9.9999997e-06);
l9_407*=(l9_409+((1.0-float(l9_406))*(1.0-l9_409)));
l9_403=l9_408;
l9_371.y=l9_403;
l9_381=l9_407;
}
float2 l9_410=l9_371;
bool l9_411=l9_372;
float3x3 l9_412=l9_373;
if (l9_411)
{
l9_410=float2((l9_412*float3(l9_410,1.0)).xy);
}
float2 l9_413=l9_410;
l9_371=l9_413;
float l9_414=l9_371.x;
int l9_415=l9_374.x;
bool l9_416=l9_380;
float l9_417=l9_381;
if ((l9_415==0)||(l9_415==3))
{
float l9_418=l9_414;
float l9_419=0.0;
float l9_420=1.0;
bool l9_421=l9_416;
float l9_422=l9_417;
float l9_423=fast::clamp(l9_418,l9_419,l9_420);
float l9_424=step(abs(l9_418-l9_423),9.9999997e-06);
l9_422*=(l9_424+((1.0-float(l9_421))*(1.0-l9_424)));
l9_418=l9_423;
l9_414=l9_418;
l9_417=l9_422;
}
l9_371.x=l9_414;
l9_381=l9_417;
float l9_425=l9_371.y;
int l9_426=l9_374.y;
bool l9_427=l9_380;
float l9_428=l9_381;
if ((l9_426==0)||(l9_426==3))
{
float l9_429=l9_425;
float l9_430=0.0;
float l9_431=1.0;
bool l9_432=l9_427;
float l9_433=l9_428;
float l9_434=fast::clamp(l9_429,l9_430,l9_431);
float l9_435=step(abs(l9_429-l9_434),9.9999997e-06);
l9_433*=(l9_435+((1.0-float(l9_432))*(1.0-l9_435)));
l9_429=l9_434;
l9_425=l9_429;
l9_428=l9_433;
}
l9_371.y=l9_425;
l9_381=l9_428;
float2 l9_436=l9_371;
int l9_437=l9_369;
int l9_438=l9_370;
float l9_439=l9_379;
float2 l9_440=l9_436;
int l9_441=l9_437;
int l9_442=l9_438;
float3 l9_443=float3(0.0);
if (l9_441==0)
{
l9_443=float3(l9_440,0.0);
}
else
{
if (l9_441==1)
{
l9_443=float3(l9_440.x,(l9_440.y*0.5)+(0.5-(float(l9_442)*0.5)),0.0);
}
else
{
l9_443=float3(l9_440,float(l9_442));
}
}
float3 l9_444=l9_443;
float3 l9_445=l9_444;
float4 l9_446=sc_set0.circleTexture.sample(sc_set0.circleTextureSmpSC,l9_445.xy,bias(l9_439));
float4 l9_447=l9_446;
if (l9_377)
{
l9_447=mix(l9_378,l9_447,float4(l9_381));
}
float4 l9_448=l9_447;
l9_362=l9_448;
float4 l9_449=l9_362;
float l9_450=smoothstep(0.0,0.40000001,l9_449.w*l9_360);
float l9_451=fast::clamp(l9_450,0.0,1.0);
l9_359=l9_451;
}
}
N81_circle=l9_359*l9_357;
}
param_83=N81_circle;
circle_N81=param_83;
float4 Output_N83=float4(0.0);
Output_N83=mix(Output_N91,Output_N84,float4(circle_N81));
float4 Output_N56=float4(0.0);
float4 param_84=(*sc_set0.UserUniforms).borderColor;
Output_N56=param_84;
float4 Output_N70=float4(0.0);
Output_N70=mix(OutColor_N46,Output_N56,float4(Output_N71));
float Output_N59=0.0;
float param_85=float((*sc_set0.UserUniforms).borderGradientStops);
Output_N59=param_85;
float Output_N60=0.0;
float param_86=(*sc_set0.UserUniforms).borderLinearGradientStart;
Output_N60=param_86;
float Output_N62=0.0;
float param_87=(*sc_set0.UserUniforms).borderLinearGradientAngle;
Output_N62=param_87;
float Output_N63=0.0;
float param_88=(*sc_set0.UserUniforms).borderLinearGradientLength;
Output_N63=param_88;
float2 Output_N64=float2(0.0);
float2 param_89=(*sc_set0.UserUniforms).borderGradientStartPosition;
Output_N64=param_89;
float Output_N65=0.0;
float param_90=(*sc_set0.UserUniforms).borderRadialGradientLength;
Output_N65=param_90;
float Output_N66=0.0;
float param_91=(*sc_set0.UserUniforms).borderGradientType;
Output_N66=param_91;
float4 OutColor_N67=float4(0.0);
float2 param_92=Export_N38;
float4 param_93=Output_N70;
float param_94=Output_N59;
float param_95=Output_N60;
float param_96=Output_N62;
float param_97=Output_N63;
float2 param_98=Output_N64;
float param_99=Output_N65;
float param_100=rawDist_N7;
float param_101=Output_N66;
float4 param_102=float4(0.0);
N67_uv=param_92;
N67_backgroundColor=param_93;
N67_stops=int(param_94);
N67_linearGradientStart=param_95;
N67_linearGradientAngle=param_96;
N67_linearGradientLength=param_97;
N67_gradientStartPosition=param_98;
N67_radialGradientLength=param_99;
N67_rectDist=param_100;
N67_type=int(param_101);
if (N67_stops>0)
{
if (N67_type==0)
{
float l9_452=(N67_uv.x*cos(-N67_linearGradientAngle))-(N67_uv.y*sin(-N67_linearGradientAngle));
int l9_453=0;
float4 l9_454=float4(0.0);
l9_454=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_453,0,5)];
float4 l9_455=l9_454;
N67_OutColor=l9_455;
int l9_456=1;
float4 l9_457=float4(0.0);
l9_457=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_456,0,5)];
float4 l9_458=l9_457;
int l9_459=0;
float l9_460=0.0;
l9_460=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_459,0,5)];
float l9_461=l9_460;
int l9_462=1;
float l9_463=0.0;
l9_463=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_462,0,5)];
float l9_464=l9_463;
N67_OutColor=mix(N67_OutColor,l9_458,float4(smoothstep(N67_linearGradientStart+(l9_461*N67_linearGradientLength),N67_linearGradientStart+(l9_464*N67_linearGradientLength),l9_452)));
if (N67_stops>2)
{
int l9_465=1;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_465<(N67_stops-1))
{
int l9_466=l9_465+1;
float4 l9_467=float4(0.0);
l9_467=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_466,0,5)];
float4 l9_468=l9_467;
int l9_469=l9_465;
float l9_470=0.0;
l9_470=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_469,0,5)];
float l9_471=l9_470;
int l9_472=l9_465+1;
float l9_473=0.0;
l9_473=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_472,0,5)];
float l9_474=l9_473;
N67_OutColor=mix(N67_OutColor,l9_468,float4(smoothstep(N67_linearGradientStart+(l9_471*N67_linearGradientLength),N67_linearGradientStart+(l9_474*N67_linearGradientLength),l9_452)));
l9_465++;
continue;
}
else
{
break;
}
}
}
}
else
{
if (N67_type==1)
{
float l9_475=(distance(N67_uv,N67_gradientStartPosition)/N67_radialGradientLength)*0.5;
int l9_476=0;
float4 l9_477=float4(0.0);
l9_477=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_476,0,5)];
float4 l9_478=l9_477;
N67_OutColor=l9_478;
int l9_479=1;
float4 l9_480=float4(0.0);
l9_480=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_479,0,5)];
float4 l9_481=l9_480;
int l9_482=0;
float l9_483=0.0;
l9_483=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_482,0,5)];
float l9_484=l9_483;
int l9_485=1;
float l9_486=0.0;
l9_486=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_485,0,5)];
float l9_487=l9_486;
N67_OutColor=mix(N67_OutColor,l9_481,float4(smoothstep(l9_484,l9_487,l9_475)));
if (N67_stops>2)
{
int l9_488=1;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_488<(N67_stops-1))
{
int l9_489=l9_488+1;
float4 l9_490=float4(0.0);
l9_490=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_489,0,5)];
float4 l9_491=l9_490;
int l9_492=l9_488;
float l9_493=0.0;
l9_493=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_492,0,5)];
float l9_494=l9_493;
int l9_495=l9_488+1;
float l9_496=0.0;
l9_496=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_495,0,5)];
float l9_497=l9_496;
N67_OutColor=mix(N67_OutColor,l9_491,float4(smoothstep(l9_494,l9_497,l9_475)));
l9_488++;
continue;
}
else
{
break;
}
}
}
}
else
{
if (N67_type==2)
{
float l9_498=N67_rectDist;
int l9_499=0;
float4 l9_500=float4(0.0);
l9_500=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_499,0,5)];
float4 l9_501=l9_500;
N67_OutColor=l9_501;
int l9_502=1;
float4 l9_503=float4(0.0);
l9_503=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_502,0,5)];
float4 l9_504=l9_503;
int l9_505=0;
float l9_506=0.0;
l9_506=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_505,0,5)];
float l9_507=l9_506;
int l9_508=1;
float l9_509=0.0;
l9_509=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_508,0,5)];
float l9_510=l9_509;
N67_OutColor=mix(N67_OutColor,l9_504,float4(smoothstep(l9_507,l9_510,l9_498)));
if (N67_stops>2)
{
int l9_511=1;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_511<(N67_stops-1))
{
int l9_512=l9_511+1;
float4 l9_513=float4(0.0);
l9_513=(*sc_set0.UserUniforms).borderGradientColors[clamp(l9_512,0,5)];
float4 l9_514=l9_513;
int l9_515=l9_511;
float l9_516=0.0;
l9_516=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_515,0,5)];
float l9_517=l9_516;
int l9_518=l9_511+1;
float l9_519=0.0;
l9_519=(*sc_set0.UserUniforms).borderGradientPercents[clamp(l9_518,0,5)];
float l9_520=l9_519;
N67_OutColor=mix(N67_OutColor,l9_514,float4(smoothstep(l9_517,l9_520,l9_498)));
l9_511++;
continue;
}
else
{
break;
}
}
}
}
}
}
}
else
{
N67_OutColor=N67_backgroundColor;
}
param_102=N67_OutColor;
OutColor_N67=param_102;
float Output_N109=0.0;
float param_103=(*sc_set0.UserUniforms).edgeHighlightStop1;
Output_N109=param_103;
float Output_N110=0.0;
float param_104=(*sc_set0.UserUniforms).edgeHighlightStop2;
Output_N110=param_104;
float Output_N89=0.0;
Output_N89=smoothstep(Output_N109,Output_N110,Output_N86);
float Output_N99=0.0;
Output_N99=Output_N98*Output_N89;
float Output_N90=0.0;
Output_N90=fast::max(Output_N99,(*sc_set0.UserUniforms).Port_Input1_N090);
float Output_N88=0.0;
Output_N88=dist_N7*Output_N90;
float4 Output_N41=float4(0.0);
Output_N41=mix(Output_N83,OutColor_N67,float4(Output_N88));
float3 Value1_N75=float3(0.0);
float Value2_N75=0.0;
float4 param_105=Output_N41;
float3 param_106=param_105.xyz;
float param_107=param_105.w;
Value1_N75=param_106;
Value2_N75=param_107;
float Result_N117=0.0;
float param_108=0.0;
float param_109=0.0;
float param_110=(*sc_set0.UserUniforms).Port_Default_N117;
ssGlobals param_112=Globals;
float l9_521=0.0;
float l9_522=float((*sc_set0.UserUniforms).cutOutCenter!=0);
l9_521=l9_522;
param_108=l9_521;
float param_111;
if ((param_108*1.0)!=0.0)
{
float l9_523=0.0;
float l9_524=float((*sc_set0.UserUniforms).borderOnly!=0);
l9_523=l9_524;
float l9_525=0.0;
float l9_526=float((*sc_set0.UserUniforms).cutOutCenter!=0);
l9_525=l9_526;
float3 l9_527=float3(0.0);
l9_527=param_112.SurfacePosition_ObjectSpace;
float2 l9_528=float2(0.0);
float2 l9_529=(*sc_set0.UserUniforms).size;
l9_528=l9_529;
float2 l9_530=float2(0.0);
l9_530=l9_528;
float l9_531=0.0;
float l9_532=0.0;
float2 l9_533=l9_530;
float l9_534=l9_533.x;
float l9_535=l9_533.y;
l9_531=l9_534;
l9_532=l9_535;
float2 l9_536=float2(0.0);
l9_536.x=l9_531;
l9_536.y=l9_532;
float l9_537=0.0;
float l9_538=(*sc_set0.UserUniforms).cornerRadius;
l9_537=l9_538;
float l9_539=0.0;
l9_539=l9_537;
float l9_540=0.0;
l9_540=l9_539-1.0;
float l9_541=0.0;
l9_541=l9_540*(*sc_set0.UserUniforms).Port_Input1_N032;
float2 l9_542=float2(0.0);
l9_542=l9_536-float2(l9_541);
float2 l9_543=float2(0.0);
l9_543=l9_542*(*sc_set0.UserUniforms).Port_Input1_N025;
float2 l9_544=float2(0.0);
l9_544=l9_527.xy+l9_543;
float l9_545=0.0;
float l9_546=0.0;
float2 l9_547=l9_542;
float l9_548=l9_547.x;
float l9_549=l9_547.y;
l9_545=l9_548;
l9_546=l9_549;
float l9_550=0.0;
l9_550=(*sc_set0.UserUniforms).Port_Input0_N016*l9_545;
float l9_551=0.0;
l9_551=(*sc_set0.UserUniforms).Port_Input0_N017*l9_546;
float2 l9_552=float2(0.0);
l9_552.x=l9_550;
l9_552.y=l9_551;
float2 l9_553=float2(0.0);
l9_553=l9_544+l9_552;
float2 l9_554=float2(0.0);
l9_554=l9_543+float2(l9_539);
float2 l9_555=float2(0.0);
l9_555=l9_553/(l9_554+float2(1.234e-06));
float2 l9_556=float2(0.0);
l9_556=l9_555;
float l9_557=0.0;
float l9_558=(*sc_set0.UserUniforms).frameBorder;
l9_557=l9_558;
float l9_559=0.0;
float l9_560=l9_523;
float l9_561=l9_525;
float2 l9_562=l9_556;
float2 l9_563=l9_528;
float l9_564=l9_557;
float l9_565=0.0;
N114_borderOnly=l9_560!=0.0;
N114_cutOutCenter=l9_561!=0.0;
N114_uv=l9_562;
N114_size=l9_563;
N114_margin=l9_564;
N114_isCenter=1.0;
if (N114_cutOutCenter||N114_borderOnly)
{
float2 l9_566=(N114_size+float2(2.0))-float2(N114_margin*2.0);
float2 l9_567=(N114_uv*(N114_size+float2(2.0)))*0.5;
float2 l9_568=l9_567;
float2 l9_569=l9_566;
float l9_570=smoothstep((l9_569.x*(-0.5))-1.0,(l9_569.x*(-0.5))+1.0,l9_568.x);
l9_570*=smoothstep((l9_569.x*0.5)+1.0,(l9_569.x*0.5)-1.0,l9_568.x);
l9_570*=smoothstep((l9_569.y*(-0.5))-1.0,(l9_569.y*(-0.5))+1.0,l9_568.y);
l9_570*=smoothstep((l9_569.y*0.5)+1.0,(l9_569.y*0.5)-1.0,l9_568.y);
float l9_571=smoothstep(0.0,1.0,l9_570);
N114_isCenter=l9_571;
}
l9_565=N114_isCenter;
l9_559=l9_565;
float l9_572=0.0;
l9_572=(*sc_set0.UserUniforms).Port_Input0_N119-l9_559;
param_109=l9_572;
param_111=param_109;
}
else
{
param_111=param_110;
}
Result_N117=param_111;
float Output_N74=0.0;
float param_113=(*sc_set0.UserUniforms).opacityFactor;
Output_N74=param_113;
float Output_N78=0.0;
Output_N78=Value2_N75*Output_N74;
float Output_N118=0.0;
Output_N118=Result_N117*Output_N78;
float4 Value_N76=float4(0.0);
Value_N76=float4(Value1_N75.x,Value1_N75.y,Value1_N75.z,Value_N76.w);
Value_N76.w=Output_N118;
FinalColor=Value_N76;
float param_114=FinalColor.w;
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
if (param_114<(*sc_set0.UserUniforms).alphaTestThreshold)
{
discard_fragment();
}
}
if ((int(ENABLE_STIPPLE_PATTERN_TEST_tmp)!=0))
{
float4 l9_573=gl_FragCoord;
float2 l9_574=floor(mod(l9_573.xy,float2(4.0)));
float l9_575=(mod(dot(l9_574,float2(4.0,1.0))*9.0,16.0)+1.0)/17.0;
if (param_114<l9_575)
{
discard_fragment();
}
}
float4 param_115=FinalColor;
if ((int(sc_ProjectiveShadowsCaster_tmp)!=0))
{
float4 l9_576=param_115;
float4 l9_577=l9_576;
float l9_578=1.0;
if ((((int(sc_BlendMode_Normal_tmp)!=0)||(int(sc_BlendMode_AlphaToCoverage_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaHardware_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_578=l9_577.w;
}
else
{
if ((int(sc_BlendMode_PremultipliedAlpha_tmp)!=0))
{
l9_578=fast::clamp(l9_577.w*2.0,0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_578=fast::clamp(dot(l9_577.xyz,float3(l9_577.w)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
l9_578=1.0;
}
else
{
if ((int(sc_BlendMode_Multiply_tmp)!=0))
{
l9_578=(1.0-dot(l9_577.xyz,float3(0.33333001)))*l9_577.w;
}
else
{
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_578=(1.0-fast::clamp(dot(l9_577.xyz,float3(1.0)),0.0,1.0))*l9_577.w;
}
else
{
if ((int(sc_BlendMode_ColoredGlass_tmp)!=0))
{
l9_578=fast::clamp(dot(l9_577.xyz,float3(1.0)),0.0,1.0)*l9_577.w;
}
else
{
if ((int(sc_BlendMode_Add_tmp)!=0))
{
l9_578=fast::clamp(dot(l9_577.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_578=fast::clamp(dot(l9_577.xyz,float3(1.0)),0.0,1.0)*l9_577.w;
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0))
{
l9_578=dot(l9_577.xyz,float3(0.33333001))*l9_577.w;
}
else
{
if ((int(sc_BlendMode_Min_tmp)!=0))
{
l9_578=1.0-fast::clamp(dot(l9_577.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_Max_tmp)!=0))
{
l9_578=fast::clamp(dot(l9_577.xyz,float3(1.0)),0.0,1.0);
}
}
}
}
}
}
}
}
}
}
}
}
float l9_579=l9_578;
float l9_580=l9_579;
float l9_581=(*sc_set0.UserUniforms).sc_ShadowDensity*l9_580;
float3 l9_582=mix((*sc_set0.UserUniforms).sc_ShadowColor.xyz,(*sc_set0.UserUniforms).sc_ShadowColor.xyz*l9_576.xyz,float3((*sc_set0.UserUniforms).sc_ShadowColor.w));
float4 l9_583=float4(l9_582.x,l9_582.y,l9_582.z,l9_581);
param_115=l9_583;
}
else
{
if ((int(sc_RenderAlphaToColor_tmp)!=0))
{
param_115=float4(param_115.w);
}
else
{
if ((int(sc_BlendMode_Custom_tmp)!=0))
{
float4 l9_584=param_115;
float4 l9_585=float4(0.0);
float4 l9_586=float4(0.0);
if ((int(sc_FramebufferFetch_tmp)!=0))
{
float4 l9_587=out.sc_FragData0;
l9_586=l9_587;
}
else
{
float4 l9_588=gl_FragCoord;
float2 l9_589=l9_588.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_590=l9_589;
float2 l9_591=float2(0.0);
if (sc_StereoRenderingMode_tmp==1)
{
int l9_592=1;
int l9_593=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_593=0;
}
else
{
l9_593=in.varStereoViewID;
}
int l9_594=l9_593;
int l9_595=l9_594;
float3 l9_596=float3(l9_590,0.0);
int l9_597=l9_592;
int l9_598=l9_595;
if (l9_597==1)
{
l9_596.y=((2.0*l9_596.y)+float(l9_598))-1.0;
}
float2 l9_599=l9_596.xy;
l9_591=l9_599;
}
else
{
l9_591=l9_590;
}
float2 l9_600=l9_591;
float2 l9_601=l9_600;
float2 l9_602=l9_601;
float2 l9_603=l9_602;
float l9_604=0.0;
int l9_605;
if ((int(sc_ScreenTextureHasSwappedViews_tmp)!=0))
{
int l9_606=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_606=0;
}
else
{
l9_606=in.varStereoViewID;
}
int l9_607=l9_606;
l9_605=1-l9_607;
}
else
{
int l9_608=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_608=0;
}
else
{
l9_608=in.varStereoViewID;
}
int l9_609=l9_608;
l9_605=l9_609;
}
int l9_610=l9_605;
float2 l9_611=l9_603;
int l9_612=sc_ScreenTextureLayout_tmp;
int l9_613=l9_610;
float l9_614=l9_604;
float2 l9_615=l9_611;
int l9_616=l9_612;
int l9_617=l9_613;
float3 l9_618=float3(0.0);
if (l9_616==0)
{
l9_618=float3(l9_615,0.0);
}
else
{
if (l9_616==1)
{
l9_618=float3(l9_615.x,(l9_615.y*0.5)+(0.5-(float(l9_617)*0.5)),0.0);
}
else
{
l9_618=float3(l9_615,float(l9_617));
}
}
float3 l9_619=l9_618;
float3 l9_620=l9_619;
float4 l9_621=sc_set0.sc_ScreenTexture.sample(sc_set0.sc_ScreenTextureSmpSC,l9_620.xy,bias(l9_614));
float4 l9_622=l9_621;
float4 l9_623=l9_622;
l9_586=l9_623;
}
float4 l9_624=l9_586;
float3 l9_625=l9_624.xyz;
float3 l9_626=l9_625;
float3 l9_627=l9_584.xyz;
float3 l9_628=definedBlend(l9_626,l9_627,in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.intensityTexture,sc_set0.intensityTextureSmpSC);
l9_585=float4(l9_628.x,l9_628.y,l9_628.z,l9_585.w);
float3 l9_629=mix(l9_625,l9_585.xyz,float3(l9_584.w));
l9_585=float4(l9_629.x,l9_629.y,l9_629.z,l9_585.w);
l9_585.w=1.0;
float4 l9_630=l9_585;
param_115=l9_630;
}
else
{
if ((int(sc_Voxelization_tmp)!=0))
{
float4 l9_631=float4(in.varScreenPos.xyz,1.0);
param_115=l9_631;
}
else
{
if ((int(sc_OutputBounds_tmp)!=0))
{
float4 l9_632=gl_FragCoord;
float l9_633=fast::clamp(abs(l9_632.z),0.0,1.0);
float4 l9_634=float4(l9_633,1.0-l9_633,1.0,1.0);
param_115=l9_634;
}
else
{
float4 l9_635=param_115;
float4 l9_636=float4(0.0);
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_636=float4(mix(float3(1.0),l9_635.xyz,float3(l9_635.w)),l9_635.w);
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0)||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
float l9_637=l9_635.w;
if ((int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_637=fast::clamp(l9_637,0.0,1.0);
}
l9_636=float4(l9_635.xyz*l9_637,l9_637);
}
else
{
l9_636=l9_635;
}
}
float4 l9_638=l9_636;
param_115=l9_638;
}
}
}
}
}
float4 l9_639=param_115;
FinalColor=l9_639;
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
if (PreviewInfo.Saved)
{
FinalColor=float4(PreviewInfo.Color);
}
else
{
FinalColor=float4(0.0);
}
}
float4 l9_640=float4(0.0);
l9_640=float4(0.0);
float4 l9_641=l9_640;
float4 Cost=l9_641;
if (Cost.w>0.0)
{
FinalColor=Cost;
}
FinalColor=fast::max(FinalColor,float4(0.0));
float4 param_116=FinalColor;
FinalColor=sc_OutputMotionVectorIfNeeded(param_116,in.varPosAndMotion,in.varNormalAndMotion);
float4 param_117=FinalColor;
float4 l9_642=param_117;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_642.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
out.sc_FragData0=l9_642;
return out;
}
} // FRAGMENT SHADER
