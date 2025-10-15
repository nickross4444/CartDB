#include <metal_stdlib>
#include <simd/simd.h>
using namespace metal;
#ifdef alpha_channel
#undef alpha_channel
#endif
#ifdef red_channel
#undef red_channel
#endif
#ifdef green_channel
#undef green_channel
#endif
#ifdef blue_channel
#undef blue_channel
#endif
#ifdef envmap_preview
#undef envmap_preview
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
//sampler sampler baseTexSmpSC 0:22
//sampler sampler intensityTextureSmpSC 0:23
//sampler sampler sc_RayTracingHitCasterIdAndBarycentricSmpSC 0:27
//sampler sampler sc_RayTracingRayDirectionSmpSC 0:28
//sampler sampler sc_ScreenTextureSmpSC 0:30
//texture texture2D baseTex 0:4:0:22
//texture texture2D intensityTexture 0:5:0:23
//texture utexture2D sc_RayTracingHitCasterIdAndBarycentric 0:16:0:27
//texture texture2D sc_RayTracingRayDirection 0:17:0:28
//texture texture2D sc_ScreenTexture 0:19:0:30
//ubo float sc_BonesUBO 0:3:96 {
//sc_Bone_t sc_Bones 0:[1]:96
//float4 sc_Bones.boneMatrix 0:[3]:16
//float4 sc_Bones.normalMatrix 48:[3]:16
//}
//ubo int UserUniforms 0:33:4656 {
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
//uint4 sc_RayTracingCasterConfiguration 3824
//uint4 sc_RayTracingCasterOffsetPNTC 3840
//uint4 sc_RayTracingCasterOffsetTexture 3856
//uint4 sc_RayTracingCasterFormatPNTC 3872
//uint4 sc_RayTracingCasterFormatTexture 3888
//float4 voxelization_params_0 3952
//float4 voxelization_params_frustum_lrbt 3968
//float4 voxelization_params_frustum_nf 3984
//float3 voxelization_params_camera_pos 4000
//float4x4 sc_ModelMatrixVoxelization 4016
//float correctedIntensity 4080
//float3x3 intensityTextureTransform 4144
//float4 intensityTextureUvMinMax 4192
//float4 intensityTextureBorderColor 4208
//int PreviewEnabled 4372
//float alphaTestThreshold 4380
//bool alpha_channel 4384
//bool red_channel 4388
//bool green_channel 4392
//bool blue_channel 4396
//bool envmap_preview 4400
//float3x3 baseTexTransform 4464
//float4 baseTexUvMinMax 4512
//float4 baseTexBorderColor 4528
//float Port_Input1_N010 4544
//float2 Port_Input1_N057 4552
//float Port_Value2_N013 4560
//float Port_Input1_N009 4564
//float Port_Input1_N035 4568
//float Port_Value1_N036 4572
//float Port_Input1_N046 4576
//float Port_Input1_N051 4580
//float Port_Input1_N034 4584
//float Port_Value1_N043 4588
//float Port_Input1_N052 4592
//float Port_Input1_N053 4596
//float4 Port_Default_N055 4608
//float4 Port_Default_N050 4624
//float depthRef 4640
//}
//ssbo int sc_RayTracingCasterIndexBuffer 0:0:4 {
//uint sc_RayTracingCasterTriangles 0:[1]:4
//}
//ssbo float sc_RayTracingCasterNonAnimatedVertexBuffer 0:2:4 {
//float sc_RayTracingCasterNonAnimatedVertices 0:[1]:4
//}
//ssbo float sc_RayTracingCasterVertexBuffer 0:1:4 {
//float sc_RayTracingCasterVertices 0:[1]:4
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
//spec_const bool SC_USE_CLAMP_TO_BORDER_baseTex 31 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_intensityTexture 32 0
//spec_const bool SC_USE_UV_MIN_MAX_baseTex 33 0
//spec_const bool SC_USE_UV_MIN_MAX_intensityTexture 34 0
//spec_const bool SC_USE_UV_TRANSFORM_baseTex 35 0
//spec_const bool SC_USE_UV_TRANSFORM_intensityTexture 36 0
//spec_const bool UseViewSpaceDepthVariant 37 1
//spec_const bool baseTexHasSwappedViews 38 0
//spec_const bool intensityTextureHasSwappedViews 39 0
//spec_const bool sc_BlendMode_AddWithAlphaFactor 40 0
//spec_const bool sc_BlendMode_Add 41 0
//spec_const bool sc_BlendMode_AlphaTest 42 0
//spec_const bool sc_BlendMode_AlphaToCoverage 43 0
//spec_const bool sc_BlendMode_ColoredGlass 44 0
//spec_const bool sc_BlendMode_Custom 45 0
//spec_const bool sc_BlendMode_Max 46 0
//spec_const bool sc_BlendMode_Min 47 0
//spec_const bool sc_BlendMode_MultiplyOriginal 48 0
//spec_const bool sc_BlendMode_Multiply 49 0
//spec_const bool sc_BlendMode_Normal 50 0
//spec_const bool sc_BlendMode_PremultipliedAlphaAuto 51 0
//spec_const bool sc_BlendMode_PremultipliedAlphaHardware 52 0
//spec_const bool sc_BlendMode_PremultipliedAlpha 53 0
//spec_const bool sc_BlendMode_Screen 54 0
//spec_const bool sc_DepthOnly 55 0
//spec_const bool sc_FramebufferFetch 56 0
//spec_const bool sc_MotionVectorsPass 57 0
//spec_const bool sc_OITCompositingPass 58 0
//spec_const bool sc_OITDepthBoundsPass 59 0
//spec_const bool sc_OITDepthGatherPass 60 0
//spec_const bool sc_OutputBounds 61 0
//spec_const bool sc_ProjectiveShadowsCaster 62 0
//spec_const bool sc_ProjectiveShadowsReceiver 63 0
//spec_const bool sc_RayTracingCasterForceOpaque 64 0
//spec_const bool sc_RenderAlphaToColor 65 0
//spec_const bool sc_ScreenTextureHasSwappedViews 66 0
//spec_const bool sc_TAAEnabled 67 0
//spec_const bool sc_VertexBlendingUseNormals 68 0
//spec_const bool sc_VertexBlending 69 0
//spec_const bool sc_Voxelization 70 0
//spec_const int SC_DEVICE_CLASS 71 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_baseTex 72 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_intensityTexture 73 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_baseTex 74 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_intensityTexture 75 -1
//spec_const int baseTexLayout 76 0
//spec_const int intensityTextureLayout 77 0
//spec_const int sc_DepthBufferMode 78 0
//spec_const int sc_RenderingSpace 79 -1
//spec_const int sc_ScreenTextureLayout 80 0
//spec_const int sc_ShaderCacheConstant 81 0
//spec_const int sc_SkinBonesCount 82 0
//spec_const int sc_StereoRenderingMode 83 0
//spec_const int sc_StereoRendering_IsClipDistanceEnabled 84 0
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
constant bool SC_USE_CLAMP_TO_BORDER_baseTex [[function_constant(31)]];
constant bool SC_USE_CLAMP_TO_BORDER_baseTex_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_baseTex) ? SC_USE_CLAMP_TO_BORDER_baseTex : false;
constant bool SC_USE_CLAMP_TO_BORDER_intensityTexture [[function_constant(32)]];
constant bool SC_USE_CLAMP_TO_BORDER_intensityTexture_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_intensityTexture) ? SC_USE_CLAMP_TO_BORDER_intensityTexture : false;
constant bool SC_USE_UV_MIN_MAX_baseTex [[function_constant(33)]];
constant bool SC_USE_UV_MIN_MAX_baseTex_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_baseTex) ? SC_USE_UV_MIN_MAX_baseTex : false;
constant bool SC_USE_UV_MIN_MAX_intensityTexture [[function_constant(34)]];
constant bool SC_USE_UV_MIN_MAX_intensityTexture_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_intensityTexture) ? SC_USE_UV_MIN_MAX_intensityTexture : false;
constant bool SC_USE_UV_TRANSFORM_baseTex [[function_constant(35)]];
constant bool SC_USE_UV_TRANSFORM_baseTex_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_baseTex) ? SC_USE_UV_TRANSFORM_baseTex : false;
constant bool SC_USE_UV_TRANSFORM_intensityTexture [[function_constant(36)]];
constant bool SC_USE_UV_TRANSFORM_intensityTexture_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_intensityTexture) ? SC_USE_UV_TRANSFORM_intensityTexture : false;
constant bool UseViewSpaceDepthVariant [[function_constant(37)]];
constant bool UseViewSpaceDepthVariant_tmp = is_function_constant_defined(UseViewSpaceDepthVariant) ? UseViewSpaceDepthVariant : true;
constant bool baseTexHasSwappedViews [[function_constant(38)]];
constant bool baseTexHasSwappedViews_tmp = is_function_constant_defined(baseTexHasSwappedViews) ? baseTexHasSwappedViews : false;
constant bool intensityTextureHasSwappedViews [[function_constant(39)]];
constant bool intensityTextureHasSwappedViews_tmp = is_function_constant_defined(intensityTextureHasSwappedViews) ? intensityTextureHasSwappedViews : false;
constant bool sc_BlendMode_AddWithAlphaFactor [[function_constant(40)]];
constant bool sc_BlendMode_AddWithAlphaFactor_tmp = is_function_constant_defined(sc_BlendMode_AddWithAlphaFactor) ? sc_BlendMode_AddWithAlphaFactor : false;
constant bool sc_BlendMode_Add [[function_constant(41)]];
constant bool sc_BlendMode_Add_tmp = is_function_constant_defined(sc_BlendMode_Add) ? sc_BlendMode_Add : false;
constant bool sc_BlendMode_AlphaTest [[function_constant(42)]];
constant bool sc_BlendMode_AlphaTest_tmp = is_function_constant_defined(sc_BlendMode_AlphaTest) ? sc_BlendMode_AlphaTest : false;
constant bool sc_BlendMode_AlphaToCoverage [[function_constant(43)]];
constant bool sc_BlendMode_AlphaToCoverage_tmp = is_function_constant_defined(sc_BlendMode_AlphaToCoverage) ? sc_BlendMode_AlphaToCoverage : false;
constant bool sc_BlendMode_ColoredGlass [[function_constant(44)]];
constant bool sc_BlendMode_ColoredGlass_tmp = is_function_constant_defined(sc_BlendMode_ColoredGlass) ? sc_BlendMode_ColoredGlass : false;
constant bool sc_BlendMode_Custom [[function_constant(45)]];
constant bool sc_BlendMode_Custom_tmp = is_function_constant_defined(sc_BlendMode_Custom) ? sc_BlendMode_Custom : false;
constant bool sc_BlendMode_Max [[function_constant(46)]];
constant bool sc_BlendMode_Max_tmp = is_function_constant_defined(sc_BlendMode_Max) ? sc_BlendMode_Max : false;
constant bool sc_BlendMode_Min [[function_constant(47)]];
constant bool sc_BlendMode_Min_tmp = is_function_constant_defined(sc_BlendMode_Min) ? sc_BlendMode_Min : false;
constant bool sc_BlendMode_MultiplyOriginal [[function_constant(48)]];
constant bool sc_BlendMode_MultiplyOriginal_tmp = is_function_constant_defined(sc_BlendMode_MultiplyOriginal) ? sc_BlendMode_MultiplyOriginal : false;
constant bool sc_BlendMode_Multiply [[function_constant(49)]];
constant bool sc_BlendMode_Multiply_tmp = is_function_constant_defined(sc_BlendMode_Multiply) ? sc_BlendMode_Multiply : false;
constant bool sc_BlendMode_Normal [[function_constant(50)]];
constant bool sc_BlendMode_Normal_tmp = is_function_constant_defined(sc_BlendMode_Normal) ? sc_BlendMode_Normal : false;
constant bool sc_BlendMode_PremultipliedAlphaAuto [[function_constant(51)]];
constant bool sc_BlendMode_PremultipliedAlphaAuto_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlphaAuto) ? sc_BlendMode_PremultipliedAlphaAuto : false;
constant bool sc_BlendMode_PremultipliedAlphaHardware [[function_constant(52)]];
constant bool sc_BlendMode_PremultipliedAlphaHardware_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlphaHardware) ? sc_BlendMode_PremultipliedAlphaHardware : false;
constant bool sc_BlendMode_PremultipliedAlpha [[function_constant(53)]];
constant bool sc_BlendMode_PremultipliedAlpha_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlpha) ? sc_BlendMode_PremultipliedAlpha : false;
constant bool sc_BlendMode_Screen [[function_constant(54)]];
constant bool sc_BlendMode_Screen_tmp = is_function_constant_defined(sc_BlendMode_Screen) ? sc_BlendMode_Screen : false;
constant bool sc_DepthOnly [[function_constant(55)]];
constant bool sc_DepthOnly_tmp = is_function_constant_defined(sc_DepthOnly) ? sc_DepthOnly : false;
constant bool sc_FramebufferFetch [[function_constant(56)]];
constant bool sc_FramebufferFetch_tmp = is_function_constant_defined(sc_FramebufferFetch) ? sc_FramebufferFetch : false;
constant bool sc_MotionVectorsPass [[function_constant(57)]];
constant bool sc_MotionVectorsPass_tmp = is_function_constant_defined(sc_MotionVectorsPass) ? sc_MotionVectorsPass : false;
constant bool sc_OITCompositingPass [[function_constant(58)]];
constant bool sc_OITCompositingPass_tmp = is_function_constant_defined(sc_OITCompositingPass) ? sc_OITCompositingPass : false;
constant bool sc_OITDepthBoundsPass [[function_constant(59)]];
constant bool sc_OITDepthBoundsPass_tmp = is_function_constant_defined(sc_OITDepthBoundsPass) ? sc_OITDepthBoundsPass : false;
constant bool sc_OITDepthGatherPass [[function_constant(60)]];
constant bool sc_OITDepthGatherPass_tmp = is_function_constant_defined(sc_OITDepthGatherPass) ? sc_OITDepthGatherPass : false;
constant bool sc_OutputBounds [[function_constant(61)]];
constant bool sc_OutputBounds_tmp = is_function_constant_defined(sc_OutputBounds) ? sc_OutputBounds : false;
constant bool sc_ProjectiveShadowsCaster [[function_constant(62)]];
constant bool sc_ProjectiveShadowsCaster_tmp = is_function_constant_defined(sc_ProjectiveShadowsCaster) ? sc_ProjectiveShadowsCaster : false;
constant bool sc_ProjectiveShadowsReceiver [[function_constant(63)]];
constant bool sc_ProjectiveShadowsReceiver_tmp = is_function_constant_defined(sc_ProjectiveShadowsReceiver) ? sc_ProjectiveShadowsReceiver : false;
constant bool sc_RayTracingCasterForceOpaque [[function_constant(64)]];
constant bool sc_RayTracingCasterForceOpaque_tmp = is_function_constant_defined(sc_RayTracingCasterForceOpaque) ? sc_RayTracingCasterForceOpaque : false;
constant bool sc_RenderAlphaToColor [[function_constant(65)]];
constant bool sc_RenderAlphaToColor_tmp = is_function_constant_defined(sc_RenderAlphaToColor) ? sc_RenderAlphaToColor : false;
constant bool sc_ScreenTextureHasSwappedViews [[function_constant(66)]];
constant bool sc_ScreenTextureHasSwappedViews_tmp = is_function_constant_defined(sc_ScreenTextureHasSwappedViews) ? sc_ScreenTextureHasSwappedViews : false;
constant bool sc_TAAEnabled [[function_constant(67)]];
constant bool sc_TAAEnabled_tmp = is_function_constant_defined(sc_TAAEnabled) ? sc_TAAEnabled : false;
constant bool sc_VertexBlendingUseNormals [[function_constant(68)]];
constant bool sc_VertexBlendingUseNormals_tmp = is_function_constant_defined(sc_VertexBlendingUseNormals) ? sc_VertexBlendingUseNormals : false;
constant bool sc_VertexBlending [[function_constant(69)]];
constant bool sc_VertexBlending_tmp = is_function_constant_defined(sc_VertexBlending) ? sc_VertexBlending : false;
constant bool sc_Voxelization [[function_constant(70)]];
constant bool sc_Voxelization_tmp = is_function_constant_defined(sc_Voxelization) ? sc_Voxelization : false;
constant int SC_DEVICE_CLASS [[function_constant(71)]];
constant int SC_DEVICE_CLASS_tmp = is_function_constant_defined(SC_DEVICE_CLASS) ? SC_DEVICE_CLASS : -1;
constant int SC_SOFTWARE_WRAP_MODE_U_baseTex [[function_constant(72)]];
constant int SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_baseTex) ? SC_SOFTWARE_WRAP_MODE_U_baseTex : -1;
constant int SC_SOFTWARE_WRAP_MODE_U_intensityTexture [[function_constant(73)]];
constant int SC_SOFTWARE_WRAP_MODE_U_intensityTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_intensityTexture) ? SC_SOFTWARE_WRAP_MODE_U_intensityTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_baseTex [[function_constant(74)]];
constant int SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_baseTex) ? SC_SOFTWARE_WRAP_MODE_V_baseTex : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_intensityTexture [[function_constant(75)]];
constant int SC_SOFTWARE_WRAP_MODE_V_intensityTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_intensityTexture) ? SC_SOFTWARE_WRAP_MODE_V_intensityTexture : -1;
constant int baseTexLayout [[function_constant(76)]];
constant int baseTexLayout_tmp = is_function_constant_defined(baseTexLayout) ? baseTexLayout : 0;
constant int intensityTextureLayout [[function_constant(77)]];
constant int intensityTextureLayout_tmp = is_function_constant_defined(intensityTextureLayout) ? intensityTextureLayout : 0;
constant int sc_DepthBufferMode [[function_constant(78)]];
constant int sc_DepthBufferMode_tmp = is_function_constant_defined(sc_DepthBufferMode) ? sc_DepthBufferMode : 0;
constant int sc_RenderingSpace [[function_constant(79)]];
constant int sc_RenderingSpace_tmp = is_function_constant_defined(sc_RenderingSpace) ? sc_RenderingSpace : -1;
constant int sc_ScreenTextureLayout [[function_constant(80)]];
constant int sc_ScreenTextureLayout_tmp = is_function_constant_defined(sc_ScreenTextureLayout) ? sc_ScreenTextureLayout : 0;
constant int sc_ShaderCacheConstant [[function_constant(81)]];
constant int sc_ShaderCacheConstant_tmp = is_function_constant_defined(sc_ShaderCacheConstant) ? sc_ShaderCacheConstant : 0;
constant int sc_SkinBonesCount [[function_constant(82)]];
constant int sc_SkinBonesCount_tmp = is_function_constant_defined(sc_SkinBonesCount) ? sc_SkinBonesCount : 0;
constant int sc_StereoRenderingMode [[function_constant(83)]];
constant int sc_StereoRenderingMode_tmp = is_function_constant_defined(sc_StereoRenderingMode) ? sc_StereoRenderingMode : 0;
constant int sc_StereoRendering_IsClipDistanceEnabled [[function_constant(84)]];
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
uint4 sc_RayTracingCasterConfiguration;
uint4 sc_RayTracingCasterOffsetPNTC;
uint4 sc_RayTracingCasterOffsetTexture;
uint4 sc_RayTracingCasterFormatPNTC;
uint4 sc_RayTracingCasterFormatTexture;
float4 sc_RayTracingRayDirectionSize;
float4 sc_RayTracingRayDirectionDims;
float4 sc_RayTracingRayDirectionView;
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
int alpha_channel;
int red_channel;
int green_channel;
int blue_channel;
int envmap_preview;
float4 baseTexSize;
float4 baseTexDims;
float4 baseTexView;
float3x3 baseTexTransform;
float4 baseTexUvMinMax;
float4 baseTexBorderColor;
float Port_Input1_N010;
float2 Port_Input1_N057;
float Port_Value2_N013;
float Port_Input1_N009;
float Port_Input1_N035;
float Port_Value1_N036;
float Port_Input1_N046;
float Port_Input1_N051;
float Port_Input1_N034;
float Port_Value1_N043;
float Port_Input1_N052;
float Port_Input1_N053;
float4 Port_Default_N055;
float4 Port_Default_N050;
float depthRef;
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
struct sc_RayTracingCasterIndexBuffer_obj
{
uint sc_RayTracingCasterTriangles[1];
};
struct sc_RayTracingCasterVertexBuffer_obj
{
float sc_RayTracingCasterVertices[1];
};
struct sc_RayTracingCasterNonAnimatedVertexBuffer_obj
{
float sc_RayTracingCasterNonAnimatedVertices[1];
};
struct sc_Set0
{
const device sc_RayTracingCasterIndexBuffer_obj* sc_RayTracingCasterIndexBuffer [[id(0)]];
const device sc_RayTracingCasterVertexBuffer_obj* sc_RayTracingCasterVertexBuffer [[id(1)]];
const device sc_RayTracingCasterNonAnimatedVertexBuffer_obj* sc_RayTracingCasterNonAnimatedVertexBuffer [[id(2)]];
constant sc_Bones_obj* sc_BonesUBO [[id(3)]];
texture2d<float> baseTex [[id(4)]];
texture2d<float> intensityTexture [[id(5)]];
texture2d<uint> sc_RayTracingHitCasterIdAndBarycentric [[id(16)]];
texture2d<float> sc_RayTracingRayDirection [[id(17)]];
texture2d<float> sc_ScreenTexture [[id(19)]];
sampler baseTexSmpSC [[id(22)]];
sampler intensityTextureSmpSC [[id(23)]];
sampler sc_RayTracingHitCasterIdAndBarycentricSmpSC [[id(27)]];
sampler sc_RayTracingRayDirectionSmpSC [[id(28)]];
sampler sc_ScreenTextureSmpSC [[id(30)]];
constant userUniformsObj* UserUniforms [[id(33)]];
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
if ((*sc_set0.UserUniforms).sc_RayTracingCasterConfiguration.x!=0u)
{
float4 param=float4(in.position.xy,(*sc_set0.UserUniforms).depthRef+(1e-10*in.position.z),1.0+(1e-10*in.position.w));
if (sc_ShaderCacheConstant_tmp!=0)
{
param.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_0=param;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_1=dot(l9_0,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_2=l9_1;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_2;
}
}
float4 l9_3=float4(param.x,-param.y,(param.z*0.5)+(param.w*0.5),param.w);
out.gl_Position=l9_3;
return out;
}
out.PreviewVertexColor=float4(0.5);
ssPreviewInfo PreviewInfo;
PreviewInfo.Color=float4(0.5);
PreviewInfo.Saved=false;
out.PreviewVertexSaved=0.0;
sc_Vertex_t l9_5;
l9_5.position=in.position;
l9_5.normal=in.normal;
l9_5.tangent=in.tangent.xyz;
l9_5.texture0=in.texture0;
l9_5.texture1=in.texture1;
sc_Vertex_t l9_6=l9_5;
sc_Vertex_t param_1=l9_6;
if ((int(sc_Voxelization_tmp)!=0))
{
sc_Vertex_t l9_7=param_1;
param_1=l9_7;
}
sc_Vertex_t l9_8=param_1;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_9=l9_8;
float3 l9_10=in.blendShape0Pos;
float3 l9_11=in.blendShape0Normal;
float l9_12=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_13=l9_9;
float3 l9_14=l9_10;
float l9_15=l9_12;
float3 l9_16=l9_13.position.xyz+(l9_14*l9_15);
l9_13.position=float4(l9_16.x,l9_16.y,l9_16.z,l9_13.position.w);
l9_9=l9_13;
l9_9.normal+=(l9_11*l9_12);
l9_8=l9_9;
sc_Vertex_t l9_17=l9_8;
float3 l9_18=in.blendShape1Pos;
float3 l9_19=in.blendShape1Normal;
float l9_20=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_21=l9_17;
float3 l9_22=l9_18;
float l9_23=l9_20;
float3 l9_24=l9_21.position.xyz+(l9_22*l9_23);
l9_21.position=float4(l9_24.x,l9_24.y,l9_24.z,l9_21.position.w);
l9_17=l9_21;
l9_17.normal+=(l9_19*l9_20);
l9_8=l9_17;
sc_Vertex_t l9_25=l9_8;
float3 l9_26=in.blendShape2Pos;
float3 l9_27=in.blendShape2Normal;
float l9_28=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_29=l9_25;
float3 l9_30=l9_26;
float l9_31=l9_28;
float3 l9_32=l9_29.position.xyz+(l9_30*l9_31);
l9_29.position=float4(l9_32.x,l9_32.y,l9_32.z,l9_29.position.w);
l9_25=l9_29;
l9_25.normal+=(l9_27*l9_28);
l9_8=l9_25;
}
else
{
sc_Vertex_t l9_33=l9_8;
float3 l9_34=in.blendShape0Pos;
float l9_35=(*sc_set0.UserUniforms).weights0.x;
float3 l9_36=l9_33.position.xyz+(l9_34*l9_35);
l9_33.position=float4(l9_36.x,l9_36.y,l9_36.z,l9_33.position.w);
l9_8=l9_33;
sc_Vertex_t l9_37=l9_8;
float3 l9_38=in.blendShape1Pos;
float l9_39=(*sc_set0.UserUniforms).weights0.y;
float3 l9_40=l9_37.position.xyz+(l9_38*l9_39);
l9_37.position=float4(l9_40.x,l9_40.y,l9_40.z,l9_37.position.w);
l9_8=l9_37;
sc_Vertex_t l9_41=l9_8;
float3 l9_42=in.blendShape2Pos;
float l9_43=(*sc_set0.UserUniforms).weights0.z;
float3 l9_44=l9_41.position.xyz+(l9_42*l9_43);
l9_41.position=float4(l9_44.x,l9_44.y,l9_44.z,l9_41.position.w);
l9_8=l9_41;
sc_Vertex_t l9_45=l9_8;
float3 l9_46=in.blendShape3Pos;
float l9_47=(*sc_set0.UserUniforms).weights0.w;
float3 l9_48=l9_45.position.xyz+(l9_46*l9_47);
l9_45.position=float4(l9_48.x,l9_48.y,l9_48.z,l9_45.position.w);
l9_8=l9_45;
sc_Vertex_t l9_49=l9_8;
float3 l9_50=in.blendShape4Pos;
float l9_51=(*sc_set0.UserUniforms).weights1.x;
float3 l9_52=l9_49.position.xyz+(l9_50*l9_51);
l9_49.position=float4(l9_52.x,l9_52.y,l9_52.z,l9_49.position.w);
l9_8=l9_49;
sc_Vertex_t l9_53=l9_8;
float3 l9_54=in.blendShape5Pos;
float l9_55=(*sc_set0.UserUniforms).weights1.y;
float3 l9_56=l9_53.position.xyz+(l9_54*l9_55);
l9_53.position=float4(l9_56.x,l9_56.y,l9_56.z,l9_53.position.w);
l9_8=l9_53;
}
}
param_1=l9_8;
sc_Vertex_t l9_57=param_1;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_58=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_58=float4(1.0,fract(in.boneData.yzw));
l9_58.x-=dot(l9_58.yzw,float3(1.0));
}
float4 l9_59=l9_58;
float4 l9_60=l9_59;
int l9_61=int(in.boneData.x);
int l9_62=int(in.boneData.y);
int l9_63=int(in.boneData.z);
int l9_64=int(in.boneData.w);
int l9_65=l9_61;
float4 l9_66=l9_57.position;
float3 l9_67=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_68=l9_65;
float4 l9_69=(*sc_set0.sc_BonesUBO).sc_Bones[l9_68].boneMatrix[0];
float4 l9_70=(*sc_set0.sc_BonesUBO).sc_Bones[l9_68].boneMatrix[1];
float4 l9_71=(*sc_set0.sc_BonesUBO).sc_Bones[l9_68].boneMatrix[2];
float4 l9_72[3];
l9_72[0]=l9_69;
l9_72[1]=l9_70;
l9_72[2]=l9_71;
l9_67=float3(dot(l9_66,l9_72[0]),dot(l9_66,l9_72[1]),dot(l9_66,l9_72[2]));
}
else
{
l9_67=l9_66.xyz;
}
float3 l9_73=l9_67;
float3 l9_74=l9_73;
float l9_75=l9_60.x;
int l9_76=l9_62;
float4 l9_77=l9_57.position;
float3 l9_78=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_79=l9_76;
float4 l9_80=(*sc_set0.sc_BonesUBO).sc_Bones[l9_79].boneMatrix[0];
float4 l9_81=(*sc_set0.sc_BonesUBO).sc_Bones[l9_79].boneMatrix[1];
float4 l9_82=(*sc_set0.sc_BonesUBO).sc_Bones[l9_79].boneMatrix[2];
float4 l9_83[3];
l9_83[0]=l9_80;
l9_83[1]=l9_81;
l9_83[2]=l9_82;
l9_78=float3(dot(l9_77,l9_83[0]),dot(l9_77,l9_83[1]),dot(l9_77,l9_83[2]));
}
else
{
l9_78=l9_77.xyz;
}
float3 l9_84=l9_78;
float3 l9_85=l9_84;
float l9_86=l9_60.y;
int l9_87=l9_63;
float4 l9_88=l9_57.position;
float3 l9_89=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_90=l9_87;
float4 l9_91=(*sc_set0.sc_BonesUBO).sc_Bones[l9_90].boneMatrix[0];
float4 l9_92=(*sc_set0.sc_BonesUBO).sc_Bones[l9_90].boneMatrix[1];
float4 l9_93=(*sc_set0.sc_BonesUBO).sc_Bones[l9_90].boneMatrix[2];
float4 l9_94[3];
l9_94[0]=l9_91;
l9_94[1]=l9_92;
l9_94[2]=l9_93;
l9_89=float3(dot(l9_88,l9_94[0]),dot(l9_88,l9_94[1]),dot(l9_88,l9_94[2]));
}
else
{
l9_89=l9_88.xyz;
}
float3 l9_95=l9_89;
float3 l9_96=l9_95;
float l9_97=l9_60.z;
int l9_98=l9_64;
float4 l9_99=l9_57.position;
float3 l9_100=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_101=l9_98;
float4 l9_102=(*sc_set0.sc_BonesUBO).sc_Bones[l9_101].boneMatrix[0];
float4 l9_103=(*sc_set0.sc_BonesUBO).sc_Bones[l9_101].boneMatrix[1];
float4 l9_104=(*sc_set0.sc_BonesUBO).sc_Bones[l9_101].boneMatrix[2];
float4 l9_105[3];
l9_105[0]=l9_102;
l9_105[1]=l9_103;
l9_105[2]=l9_104;
l9_100=float3(dot(l9_99,l9_105[0]),dot(l9_99,l9_105[1]),dot(l9_99,l9_105[2]));
}
else
{
l9_100=l9_99.xyz;
}
float3 l9_106=l9_100;
float3 l9_107=(((l9_74*l9_75)+(l9_85*l9_86))+(l9_96*l9_97))+(l9_106*l9_60.w);
l9_57.position=float4(l9_107.x,l9_107.y,l9_107.z,l9_57.position.w);
int l9_108=l9_61;
float3x3 l9_109=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_108].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_108].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_108].normalMatrix[2].xyz));
float3x3 l9_110=l9_109;
float3x3 l9_111=l9_110;
int l9_112=l9_62;
float3x3 l9_113=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_112].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_112].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_112].normalMatrix[2].xyz));
float3x3 l9_114=l9_113;
float3x3 l9_115=l9_114;
int l9_116=l9_63;
float3x3 l9_117=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_116].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_116].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_116].normalMatrix[2].xyz));
float3x3 l9_118=l9_117;
float3x3 l9_119=l9_118;
int l9_120=l9_64;
float3x3 l9_121=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_120].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_120].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_120].normalMatrix[2].xyz));
float3x3 l9_122=l9_121;
float3x3 l9_123=l9_122;
l9_57.normal=((((l9_111*l9_57.normal)*l9_60.x)+((l9_115*l9_57.normal)*l9_60.y))+((l9_119*l9_57.normal)*l9_60.z))+((l9_123*l9_57.normal)*l9_60.w);
l9_57.tangent=((((l9_111*l9_57.tangent)*l9_60.x)+((l9_115*l9_57.tangent)*l9_60.y))+((l9_119*l9_57.tangent)*l9_60.z))+((l9_123*l9_57.tangent)*l9_60.w);
}
param_1=l9_57;
if (sc_RenderingSpace_tmp==3)
{
out.varPosAndMotion=float4(float3(0.0).x,float3(0.0).y,float3(0.0).z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param_1.normal.x,param_1.normal.y,param_1.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param_1.tangent.x,param_1.tangent.y,param_1.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==4)
{
out.varPosAndMotion=float4(float3(0.0).x,float3(0.0).y,float3(0.0).z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param_1.normal.x,param_1.normal.y,param_1.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param_1.tangent.x,param_1.tangent.y,param_1.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
out.varPosAndMotion=float4(param_1.position.xyz.x,param_1.position.xyz.y,param_1.position.xyz.z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param_1.normal.x,param_1.normal.y,param_1.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param_1.tangent.x,param_1.tangent.y,param_1.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
float3 l9_124=((*sc_set0.UserUniforms).sc_ModelMatrix*param_1.position).xyz;
out.varPosAndMotion=float4(l9_124.x,l9_124.y,l9_124.z,out.varPosAndMotion.w);
float3 l9_125=(*sc_set0.UserUniforms).sc_NormalMatrix*param_1.normal;
out.varNormalAndMotion=float4(l9_125.x,l9_125.y,l9_125.z,out.varNormalAndMotion.w);
float3 l9_126=(*sc_set0.UserUniforms).sc_NormalMatrix*param_1.tangent;
out.varTangent=float4(l9_126.x,l9_126.y,l9_126.z,out.varTangent.w);
}
}
}
}
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
param_1.texture0.x=1.0-param_1.texture0.x;
}
out.varColor=in.color;
sc_Vertex_t v=param_1;
float3 WorldPosition=out.varPosAndMotion.xyz;
float3 WorldNormal=out.varNormalAndMotion.xyz;
float3 WorldTangent=out.varTangent.xyz;
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
WorldPosition=out.varPosAndMotion.xyz;
WorldNormal=out.varNormalAndMotion.xyz;
WorldTangent=out.varTangent.xyz;
}
sc_Vertex_t param_2=v;
float3 param_3=WorldPosition;
float3 param_4=WorldNormal;
float3 param_5=WorldTangent;
float4 param_6=v.position;
out.varPosAndMotion=float4(param_3.x,param_3.y,param_3.z,out.varPosAndMotion.w);
float3 l9_127=normalize(param_4);
out.varNormalAndMotion=float4(l9_127.x,l9_127.y,l9_127.z,out.varNormalAndMotion.w);
float3 l9_128=normalize(param_5);
out.varTangent=float4(l9_128.x,l9_128.y,l9_128.z,out.varTangent.w);
out.varTangent.w=in.tangent.w;
if ((int(UseViewSpaceDepthVariant_tmp)!=0)&&(((int(sc_OITDepthGatherPass_tmp)!=0)||(int(sc_OITCompositingPass_tmp)!=0))||(int(sc_OITDepthBoundsPass_tmp)!=0)))
{
float4 l9_129=param_2.position;
float4 l9_130=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
int l9_131=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_131=0;
}
else
{
l9_131=gl_InstanceIndex%2;
}
int l9_132=l9_131;
l9_130=(*sc_set0.UserUniforms).sc_ProjectionMatrixInverseArray[l9_132]*l9_129;
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_133=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_133=0;
}
else
{
l9_133=gl_InstanceIndex%2;
}
int l9_134=l9_133;
l9_130=(*sc_set0.UserUniforms).sc_ViewMatrixArray[l9_134]*l9_129;
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_135=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_135=0;
}
else
{
l9_135=gl_InstanceIndex%2;
}
int l9_136=l9_135;
l9_130=(*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_136]*l9_129;
}
else
{
l9_130=l9_129;
}
}
}
float4 l9_137=l9_130;
out.varViewSpaceDepth=-l9_137.z;
}
float4 l9_138=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
l9_138=param_6;
}
else
{
if (sc_RenderingSpace_tmp==4)
{
int l9_139=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_139=0;
}
else
{
l9_139=gl_InstanceIndex%2;
}
int l9_140=l9_139;
l9_138=((*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_140]*param_2.position)*float4(1.0/(*sc_set0.UserUniforms).sc_Camera.aspect,1.0,1.0,1.0);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_141=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_141=0;
}
else
{
l9_141=gl_InstanceIndex%2;
}
int l9_142=l9_141;
l9_138=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_142]*float4(out.varPosAndMotion.xyz,1.0);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_143=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_143=0;
}
else
{
l9_143=gl_InstanceIndex%2;
}
int l9_144=l9_143;
l9_138=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_144]*float4(out.varPosAndMotion.xyz,1.0);
}
}
}
}
out.varTex01=float4(param_2.texture0,param_2.texture1);
if ((int(sc_ProjectiveShadowsReceiver_tmp)!=0))
{
float4 l9_145=param_2.position;
float4 l9_146=l9_145;
if (sc_RenderingSpace_tmp==1)
{
l9_146=(*sc_set0.UserUniforms).sc_ModelMatrix*l9_145;
}
float4 l9_147=(*sc_set0.UserUniforms).sc_ProjectorMatrix*l9_146;
float2 l9_148=((l9_147.xy/float2(l9_147.w))*0.5)+float2(0.5);
out.varShadowTex=l9_148;
}
float4 l9_149=l9_138;
if (sc_DepthBufferMode_tmp==1)
{
int l9_150=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_150=0;
}
else
{
l9_150=gl_InstanceIndex%2;
}
int l9_151=l9_150;
if ((*sc_set0.UserUniforms).sc_ProjectionMatrixArray[l9_151][2].w!=0.0)
{
float l9_152=2.0/log2((*sc_set0.UserUniforms).sc_Camera.clipPlanes.y+1.0);
l9_149.z=((log2(fast::max((*sc_set0.UserUniforms).sc_Camera.clipPlanes.x,1.0+l9_149.w))*l9_152)-1.0)*l9_149.w;
}
}
float4 l9_153=l9_149;
l9_138=l9_153;
float4 l9_154=l9_138;
if ((int(sc_TAAEnabled_tmp)!=0))
{
float2 l9_155=l9_154.xy+((*sc_set0.UserUniforms).sc_TAAJitterOffset*l9_154.w);
l9_154=float4(l9_155.x,l9_155.y,l9_154.z,l9_154.w);
}
float4 l9_156=l9_154;
l9_138=l9_156;
float4 l9_157=l9_138;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_157.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_158=l9_157;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_159=dot(l9_158,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_160=l9_159;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_160;
}
}
float4 l9_161=float4(l9_157.x,-l9_157.y,(l9_157.z*0.5)+(l9_157.w*0.5),l9_157.w);
out.gl_Position=l9_161;
if ((int(sc_Voxelization_tmp)!=0))
{
sc_Vertex_t l9_162=param_2;
sc_Vertex_t l9_163=l9_162;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_164=l9_163;
float3 l9_165=in.blendShape0Pos;
float3 l9_166=in.blendShape0Normal;
float l9_167=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_168=l9_164;
float3 l9_169=l9_165;
float l9_170=l9_167;
float3 l9_171=l9_168.position.xyz+(l9_169*l9_170);
l9_168.position=float4(l9_171.x,l9_171.y,l9_171.z,l9_168.position.w);
l9_164=l9_168;
l9_164.normal+=(l9_166*l9_167);
l9_163=l9_164;
sc_Vertex_t l9_172=l9_163;
float3 l9_173=in.blendShape1Pos;
float3 l9_174=in.blendShape1Normal;
float l9_175=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_176=l9_172;
float3 l9_177=l9_173;
float l9_178=l9_175;
float3 l9_179=l9_176.position.xyz+(l9_177*l9_178);
l9_176.position=float4(l9_179.x,l9_179.y,l9_179.z,l9_176.position.w);
l9_172=l9_176;
l9_172.normal+=(l9_174*l9_175);
l9_163=l9_172;
sc_Vertex_t l9_180=l9_163;
float3 l9_181=in.blendShape2Pos;
float3 l9_182=in.blendShape2Normal;
float l9_183=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_184=l9_180;
float3 l9_185=l9_181;
float l9_186=l9_183;
float3 l9_187=l9_184.position.xyz+(l9_185*l9_186);
l9_184.position=float4(l9_187.x,l9_187.y,l9_187.z,l9_184.position.w);
l9_180=l9_184;
l9_180.normal+=(l9_182*l9_183);
l9_163=l9_180;
}
else
{
sc_Vertex_t l9_188=l9_163;
float3 l9_189=in.blendShape0Pos;
float l9_190=(*sc_set0.UserUniforms).weights0.x;
float3 l9_191=l9_188.position.xyz+(l9_189*l9_190);
l9_188.position=float4(l9_191.x,l9_191.y,l9_191.z,l9_188.position.w);
l9_163=l9_188;
sc_Vertex_t l9_192=l9_163;
float3 l9_193=in.blendShape1Pos;
float l9_194=(*sc_set0.UserUniforms).weights0.y;
float3 l9_195=l9_192.position.xyz+(l9_193*l9_194);
l9_192.position=float4(l9_195.x,l9_195.y,l9_195.z,l9_192.position.w);
l9_163=l9_192;
sc_Vertex_t l9_196=l9_163;
float3 l9_197=in.blendShape2Pos;
float l9_198=(*sc_set0.UserUniforms).weights0.z;
float3 l9_199=l9_196.position.xyz+(l9_197*l9_198);
l9_196.position=float4(l9_199.x,l9_199.y,l9_199.z,l9_196.position.w);
l9_163=l9_196;
sc_Vertex_t l9_200=l9_163;
float3 l9_201=in.blendShape3Pos;
float l9_202=(*sc_set0.UserUniforms).weights0.w;
float3 l9_203=l9_200.position.xyz+(l9_201*l9_202);
l9_200.position=float4(l9_203.x,l9_203.y,l9_203.z,l9_200.position.w);
l9_163=l9_200;
sc_Vertex_t l9_204=l9_163;
float3 l9_205=in.blendShape4Pos;
float l9_206=(*sc_set0.UserUniforms).weights1.x;
float3 l9_207=l9_204.position.xyz+(l9_205*l9_206);
l9_204.position=float4(l9_207.x,l9_207.y,l9_207.z,l9_204.position.w);
l9_163=l9_204;
sc_Vertex_t l9_208=l9_163;
float3 l9_209=in.blendShape5Pos;
float l9_210=(*sc_set0.UserUniforms).weights1.y;
float3 l9_211=l9_208.position.xyz+(l9_209*l9_210);
l9_208.position=float4(l9_211.x,l9_211.y,l9_211.z,l9_208.position.w);
l9_163=l9_208;
}
}
l9_162=l9_163;
sc_Vertex_t l9_212=l9_162;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_213=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_213=float4(1.0,fract(in.boneData.yzw));
l9_213.x-=dot(l9_213.yzw,float3(1.0));
}
float4 l9_214=l9_213;
float4 l9_215=l9_214;
int l9_216=int(in.boneData.x);
int l9_217=int(in.boneData.y);
int l9_218=int(in.boneData.z);
int l9_219=int(in.boneData.w);
int l9_220=l9_216;
float4 l9_221=l9_212.position;
float3 l9_222=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_223=l9_220;
float4 l9_224=(*sc_set0.sc_BonesUBO).sc_Bones[l9_223].boneMatrix[0];
float4 l9_225=(*sc_set0.sc_BonesUBO).sc_Bones[l9_223].boneMatrix[1];
float4 l9_226=(*sc_set0.sc_BonesUBO).sc_Bones[l9_223].boneMatrix[2];
float4 l9_227[3];
l9_227[0]=l9_224;
l9_227[1]=l9_225;
l9_227[2]=l9_226;
l9_222=float3(dot(l9_221,l9_227[0]),dot(l9_221,l9_227[1]),dot(l9_221,l9_227[2]));
}
else
{
l9_222=l9_221.xyz;
}
float3 l9_228=l9_222;
float3 l9_229=l9_228;
float l9_230=l9_215.x;
int l9_231=l9_217;
float4 l9_232=l9_212.position;
float3 l9_233=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_234=l9_231;
float4 l9_235=(*sc_set0.sc_BonesUBO).sc_Bones[l9_234].boneMatrix[0];
float4 l9_236=(*sc_set0.sc_BonesUBO).sc_Bones[l9_234].boneMatrix[1];
float4 l9_237=(*sc_set0.sc_BonesUBO).sc_Bones[l9_234].boneMatrix[2];
float4 l9_238[3];
l9_238[0]=l9_235;
l9_238[1]=l9_236;
l9_238[2]=l9_237;
l9_233=float3(dot(l9_232,l9_238[0]),dot(l9_232,l9_238[1]),dot(l9_232,l9_238[2]));
}
else
{
l9_233=l9_232.xyz;
}
float3 l9_239=l9_233;
float3 l9_240=l9_239;
float l9_241=l9_215.y;
int l9_242=l9_218;
float4 l9_243=l9_212.position;
float3 l9_244=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_245=l9_242;
float4 l9_246=(*sc_set0.sc_BonesUBO).sc_Bones[l9_245].boneMatrix[0];
float4 l9_247=(*sc_set0.sc_BonesUBO).sc_Bones[l9_245].boneMatrix[1];
float4 l9_248=(*sc_set0.sc_BonesUBO).sc_Bones[l9_245].boneMatrix[2];
float4 l9_249[3];
l9_249[0]=l9_246;
l9_249[1]=l9_247;
l9_249[2]=l9_248;
l9_244=float3(dot(l9_243,l9_249[0]),dot(l9_243,l9_249[1]),dot(l9_243,l9_249[2]));
}
else
{
l9_244=l9_243.xyz;
}
float3 l9_250=l9_244;
float3 l9_251=l9_250;
float l9_252=l9_215.z;
int l9_253=l9_219;
float4 l9_254=l9_212.position;
float3 l9_255=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_256=l9_253;
float4 l9_257=(*sc_set0.sc_BonesUBO).sc_Bones[l9_256].boneMatrix[0];
float4 l9_258=(*sc_set0.sc_BonesUBO).sc_Bones[l9_256].boneMatrix[1];
float4 l9_259=(*sc_set0.sc_BonesUBO).sc_Bones[l9_256].boneMatrix[2];
float4 l9_260[3];
l9_260[0]=l9_257;
l9_260[1]=l9_258;
l9_260[2]=l9_259;
l9_255=float3(dot(l9_254,l9_260[0]),dot(l9_254,l9_260[1]),dot(l9_254,l9_260[2]));
}
else
{
l9_255=l9_254.xyz;
}
float3 l9_261=l9_255;
float3 l9_262=(((l9_229*l9_230)+(l9_240*l9_241))+(l9_251*l9_252))+(l9_261*l9_215.w);
l9_212.position=float4(l9_262.x,l9_262.y,l9_262.z,l9_212.position.w);
int l9_263=l9_216;
float3x3 l9_264=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[2].xyz));
float3x3 l9_265=l9_264;
float3x3 l9_266=l9_265;
int l9_267=l9_217;
float3x3 l9_268=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[2].xyz));
float3x3 l9_269=l9_268;
float3x3 l9_270=l9_269;
int l9_271=l9_218;
float3x3 l9_272=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[2].xyz));
float3x3 l9_273=l9_272;
float3x3 l9_274=l9_273;
int l9_275=l9_219;
float3x3 l9_276=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_275].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_275].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_275].normalMatrix[2].xyz));
float3x3 l9_277=l9_276;
float3x3 l9_278=l9_277;
l9_212.normal=((((l9_266*l9_212.normal)*l9_215.x)+((l9_270*l9_212.normal)*l9_215.y))+((l9_274*l9_212.normal)*l9_215.z))+((l9_278*l9_212.normal)*l9_215.w);
l9_212.tangent=((((l9_266*l9_212.tangent)*l9_215.x)+((l9_270*l9_212.tangent)*l9_215.y))+((l9_274*l9_212.tangent)*l9_215.z))+((l9_278*l9_212.tangent)*l9_215.w);
}
l9_162=l9_212;
float l9_279=(*sc_set0.UserUniforms).voxelization_params_0.y;
float l9_280=(*sc_set0.UserUniforms).voxelization_params_0.z;
float l9_281=(*sc_set0.UserUniforms).voxelization_params_0.w;
float l9_282=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.x;
float l9_283=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.y;
float l9_284=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.z;
float l9_285=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.w;
float l9_286=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.x;
float l9_287=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.y;
float3 l9_288=(*sc_set0.UserUniforms).voxelization_params_camera_pos;
float l9_289=l9_279/l9_280;
int l9_290=gl_InstanceIndex;
int l9_291=l9_290;
l9_162.position=(*sc_set0.UserUniforms).sc_ModelMatrixVoxelization*l9_162.position;
float3 l9_292=l9_162.position.xyz;
float3 l9_293=float3(float(l9_291%int(l9_281))*l9_279,float(l9_291/int(l9_281))*l9_279,(float(l9_291)*l9_289)+l9_286);
float3 l9_294=l9_292+l9_293;
float4 l9_295=float4(l9_294-l9_288,1.0);
float l9_296=l9_282;
float l9_297=l9_283;
float l9_298=l9_284;
float l9_299=l9_285;
float l9_300=l9_286;
float l9_301=l9_287;
float4x4 l9_302=float4x4(float4(2.0/(l9_297-l9_296),0.0,0.0,(-(l9_297+l9_296))/(l9_297-l9_296)),float4(0.0,2.0/(l9_299-l9_298),0.0,(-(l9_299+l9_298))/(l9_299-l9_298)),float4(0.0,0.0,(-2.0)/(l9_301-l9_300),(-(l9_301+l9_300))/(l9_301-l9_300)),float4(0.0,0.0,0.0,1.0));
float4x4 l9_303=l9_302;
float4 l9_304=l9_303*l9_295;
l9_304.w=1.0;
out.varScreenPos=l9_304;
float4 l9_305=l9_304*1.0;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_305.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_306=l9_305;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_307=dot(l9_306,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_308=l9_307;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_308;
}
}
float4 l9_309=float4(l9_305.x,-l9_305.y,(l9_305.z*0.5)+(l9_305.w*0.5),l9_305.w);
out.gl_Position=l9_309;
param_2=l9_162;
}
else
{
if ((int(sc_OutputBounds_tmp)!=0))
{
sc_Vertex_t l9_310=param_2;
sc_Vertex_t l9_311=l9_310;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_312=l9_311;
float3 l9_313=in.blendShape0Pos;
float3 l9_314=in.blendShape0Normal;
float l9_315=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_316=l9_312;
float3 l9_317=l9_313;
float l9_318=l9_315;
float3 l9_319=l9_316.position.xyz+(l9_317*l9_318);
l9_316.position=float4(l9_319.x,l9_319.y,l9_319.z,l9_316.position.w);
l9_312=l9_316;
l9_312.normal+=(l9_314*l9_315);
l9_311=l9_312;
sc_Vertex_t l9_320=l9_311;
float3 l9_321=in.blendShape1Pos;
float3 l9_322=in.blendShape1Normal;
float l9_323=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_324=l9_320;
float3 l9_325=l9_321;
float l9_326=l9_323;
float3 l9_327=l9_324.position.xyz+(l9_325*l9_326);
l9_324.position=float4(l9_327.x,l9_327.y,l9_327.z,l9_324.position.w);
l9_320=l9_324;
l9_320.normal+=(l9_322*l9_323);
l9_311=l9_320;
sc_Vertex_t l9_328=l9_311;
float3 l9_329=in.blendShape2Pos;
float3 l9_330=in.blendShape2Normal;
float l9_331=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_332=l9_328;
float3 l9_333=l9_329;
float l9_334=l9_331;
float3 l9_335=l9_332.position.xyz+(l9_333*l9_334);
l9_332.position=float4(l9_335.x,l9_335.y,l9_335.z,l9_332.position.w);
l9_328=l9_332;
l9_328.normal+=(l9_330*l9_331);
l9_311=l9_328;
}
else
{
sc_Vertex_t l9_336=l9_311;
float3 l9_337=in.blendShape0Pos;
float l9_338=(*sc_set0.UserUniforms).weights0.x;
float3 l9_339=l9_336.position.xyz+(l9_337*l9_338);
l9_336.position=float4(l9_339.x,l9_339.y,l9_339.z,l9_336.position.w);
l9_311=l9_336;
sc_Vertex_t l9_340=l9_311;
float3 l9_341=in.blendShape1Pos;
float l9_342=(*sc_set0.UserUniforms).weights0.y;
float3 l9_343=l9_340.position.xyz+(l9_341*l9_342);
l9_340.position=float4(l9_343.x,l9_343.y,l9_343.z,l9_340.position.w);
l9_311=l9_340;
sc_Vertex_t l9_344=l9_311;
float3 l9_345=in.blendShape2Pos;
float l9_346=(*sc_set0.UserUniforms).weights0.z;
float3 l9_347=l9_344.position.xyz+(l9_345*l9_346);
l9_344.position=float4(l9_347.x,l9_347.y,l9_347.z,l9_344.position.w);
l9_311=l9_344;
sc_Vertex_t l9_348=l9_311;
float3 l9_349=in.blendShape3Pos;
float l9_350=(*sc_set0.UserUniforms).weights0.w;
float3 l9_351=l9_348.position.xyz+(l9_349*l9_350);
l9_348.position=float4(l9_351.x,l9_351.y,l9_351.z,l9_348.position.w);
l9_311=l9_348;
sc_Vertex_t l9_352=l9_311;
float3 l9_353=in.blendShape4Pos;
float l9_354=(*sc_set0.UserUniforms).weights1.x;
float3 l9_355=l9_352.position.xyz+(l9_353*l9_354);
l9_352.position=float4(l9_355.x,l9_355.y,l9_355.z,l9_352.position.w);
l9_311=l9_352;
sc_Vertex_t l9_356=l9_311;
float3 l9_357=in.blendShape5Pos;
float l9_358=(*sc_set0.UserUniforms).weights1.y;
float3 l9_359=l9_356.position.xyz+(l9_357*l9_358);
l9_356.position=float4(l9_359.x,l9_359.y,l9_359.z,l9_356.position.w);
l9_311=l9_356;
}
}
l9_310=l9_311;
sc_Vertex_t l9_360=l9_310;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_361=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_361=float4(1.0,fract(in.boneData.yzw));
l9_361.x-=dot(l9_361.yzw,float3(1.0));
}
float4 l9_362=l9_361;
float4 l9_363=l9_362;
int l9_364=int(in.boneData.x);
int l9_365=int(in.boneData.y);
int l9_366=int(in.boneData.z);
int l9_367=int(in.boneData.w);
int l9_368=l9_364;
float4 l9_369=l9_360.position;
float3 l9_370=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_371=l9_368;
float4 l9_372=(*sc_set0.sc_BonesUBO).sc_Bones[l9_371].boneMatrix[0];
float4 l9_373=(*sc_set0.sc_BonesUBO).sc_Bones[l9_371].boneMatrix[1];
float4 l9_374=(*sc_set0.sc_BonesUBO).sc_Bones[l9_371].boneMatrix[2];
float4 l9_375[3];
l9_375[0]=l9_372;
l9_375[1]=l9_373;
l9_375[2]=l9_374;
l9_370=float3(dot(l9_369,l9_375[0]),dot(l9_369,l9_375[1]),dot(l9_369,l9_375[2]));
}
else
{
l9_370=l9_369.xyz;
}
float3 l9_376=l9_370;
float3 l9_377=l9_376;
float l9_378=l9_363.x;
int l9_379=l9_365;
float4 l9_380=l9_360.position;
float3 l9_381=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_382=l9_379;
float4 l9_383=(*sc_set0.sc_BonesUBO).sc_Bones[l9_382].boneMatrix[0];
float4 l9_384=(*sc_set0.sc_BonesUBO).sc_Bones[l9_382].boneMatrix[1];
float4 l9_385=(*sc_set0.sc_BonesUBO).sc_Bones[l9_382].boneMatrix[2];
float4 l9_386[3];
l9_386[0]=l9_383;
l9_386[1]=l9_384;
l9_386[2]=l9_385;
l9_381=float3(dot(l9_380,l9_386[0]),dot(l9_380,l9_386[1]),dot(l9_380,l9_386[2]));
}
else
{
l9_381=l9_380.xyz;
}
float3 l9_387=l9_381;
float3 l9_388=l9_387;
float l9_389=l9_363.y;
int l9_390=l9_366;
float4 l9_391=l9_360.position;
float3 l9_392=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_393=l9_390;
float4 l9_394=(*sc_set0.sc_BonesUBO).sc_Bones[l9_393].boneMatrix[0];
float4 l9_395=(*sc_set0.sc_BonesUBO).sc_Bones[l9_393].boneMatrix[1];
float4 l9_396=(*sc_set0.sc_BonesUBO).sc_Bones[l9_393].boneMatrix[2];
float4 l9_397[3];
l9_397[0]=l9_394;
l9_397[1]=l9_395;
l9_397[2]=l9_396;
l9_392=float3(dot(l9_391,l9_397[0]),dot(l9_391,l9_397[1]),dot(l9_391,l9_397[2]));
}
else
{
l9_392=l9_391.xyz;
}
float3 l9_398=l9_392;
float3 l9_399=l9_398;
float l9_400=l9_363.z;
int l9_401=l9_367;
float4 l9_402=l9_360.position;
float3 l9_403=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_404=l9_401;
float4 l9_405=(*sc_set0.sc_BonesUBO).sc_Bones[l9_404].boneMatrix[0];
float4 l9_406=(*sc_set0.sc_BonesUBO).sc_Bones[l9_404].boneMatrix[1];
float4 l9_407=(*sc_set0.sc_BonesUBO).sc_Bones[l9_404].boneMatrix[2];
float4 l9_408[3];
l9_408[0]=l9_405;
l9_408[1]=l9_406;
l9_408[2]=l9_407;
l9_403=float3(dot(l9_402,l9_408[0]),dot(l9_402,l9_408[1]),dot(l9_402,l9_408[2]));
}
else
{
l9_403=l9_402.xyz;
}
float3 l9_409=l9_403;
float3 l9_410=(((l9_377*l9_378)+(l9_388*l9_389))+(l9_399*l9_400))+(l9_409*l9_363.w);
l9_360.position=float4(l9_410.x,l9_410.y,l9_410.z,l9_360.position.w);
int l9_411=l9_364;
float3x3 l9_412=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[2].xyz));
float3x3 l9_413=l9_412;
float3x3 l9_414=l9_413;
int l9_415=l9_365;
float3x3 l9_416=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[2].xyz));
float3x3 l9_417=l9_416;
float3x3 l9_418=l9_417;
int l9_419=l9_366;
float3x3 l9_420=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[2].xyz));
float3x3 l9_421=l9_420;
float3x3 l9_422=l9_421;
int l9_423=l9_367;
float3x3 l9_424=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_423].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_423].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_423].normalMatrix[2].xyz));
float3x3 l9_425=l9_424;
float3x3 l9_426=l9_425;
l9_360.normal=((((l9_414*l9_360.normal)*l9_363.x)+((l9_418*l9_360.normal)*l9_363.y))+((l9_422*l9_360.normal)*l9_363.z))+((l9_426*l9_360.normal)*l9_363.w);
l9_360.tangent=((((l9_414*l9_360.tangent)*l9_363.x)+((l9_418*l9_360.tangent)*l9_363.y))+((l9_422*l9_360.tangent)*l9_363.z))+((l9_426*l9_360.tangent)*l9_363.w);
}
l9_310=l9_360;
float3 l9_427=(*sc_set0.UserUniforms).voxelization_params_camera_pos;
float2 l9_428=((l9_310.position.xy/float2(l9_310.position.w))*0.5)+float2(0.5);
out.varTex01=float4(l9_428.x,l9_428.y,out.varTex01.z,out.varTex01.w);
l9_310.position=(*sc_set0.UserUniforms).sc_ModelMatrixVoxelization*l9_310.position;
float3 l9_429=l9_310.position.xyz-l9_427;
l9_310.position=float4(l9_429.x,l9_429.y,l9_429.z,l9_310.position.w);
out.varPosAndMotion=float4(l9_310.position.xyz.x,l9_310.position.xyz.y,l9_310.position.xyz.z,out.varPosAndMotion.w);
float3 l9_430=normalize(l9_310.normal);
out.varNormalAndMotion=float4(l9_430.x,l9_430.y,l9_430.z,out.varNormalAndMotion.w);
float l9_431=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.x;
float l9_432=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.y;
float l9_433=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.z;
float l9_434=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.w;
float l9_435=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.x;
float l9_436=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.y;
float l9_437=l9_431;
float l9_438=l9_432;
float l9_439=l9_433;
float l9_440=l9_434;
float l9_441=l9_435;
float l9_442=l9_436;
float4x4 l9_443=float4x4(float4(2.0/(l9_438-l9_437),0.0,0.0,(-(l9_438+l9_437))/(l9_438-l9_437)),float4(0.0,2.0/(l9_440-l9_439),0.0,(-(l9_440+l9_439))/(l9_440-l9_439)),float4(0.0,0.0,(-2.0)/(l9_442-l9_441),(-(l9_442+l9_441))/(l9_442-l9_441)),float4(0.0,0.0,0.0,1.0));
float4x4 l9_444=l9_443;
float4 l9_445=float4(0.0);
float3 l9_446=(l9_444*l9_310.position).xyz;
l9_445=float4(l9_446.x,l9_446.y,l9_446.z,l9_445.w);
l9_445.w=1.0;
out.varScreenPos=l9_445;
float4 l9_447=l9_445*1.0;
float4 l9_448=l9_447;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_448.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_449=l9_448;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_450=dot(l9_449,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_451=l9_450;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_451;
}
}
float4 l9_452=float4(l9_448.x,-l9_448.y,(l9_448.z*0.5)+(l9_448.w*0.5),l9_448.w);
out.gl_Position=l9_452;
param_2=l9_310;
}
}
v=param_2;
float3 param_7=out.varPosAndMotion.xyz;
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
float4 l9_453=((*sc_set0.UserUniforms).sc_PrevFrameModelMatrix*(*sc_set0.UserUniforms).sc_ModelMatrixInverse)*float4(param_7,1.0);
float3 l9_454=param_7;
float3 l9_455=l9_453.xyz;
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
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
float4 l9_458=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_457]*float4(l9_454,1.0);
float2 l9_459=l9_458.xy/float2(l9_458.w);
l9_458=float4(l9_459.x,l9_459.y,l9_458.z,l9_458.w);
int l9_460=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_460=0;
}
else
{
l9_460=gl_InstanceIndex%2;
}
int l9_461=l9_460;
float4 l9_462=(*sc_set0.UserUniforms).sc_PrevFrameViewProjectionMatrixArray[l9_461]*float4(l9_455,1.0);
float2 l9_463=l9_462.xy/float2(l9_462.w);
l9_462=float4(l9_463.x,l9_463.y,l9_462.z,l9_462.w);
float2 l9_464=(l9_458.xy-l9_462.xy)*0.5;
out.varPosAndMotion.w=l9_464.x;
out.varNormalAndMotion.w=l9_464.y;
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
struct sc_RayTracingHitPayload
{
float3 viewDirWS;
float3 positionWS;
float3 normalWS;
float4 tangentWS;
float4 color;
float2 uv0;
float2 uv1;
float2 uv2;
float2 uv3;
uint2 id;
};
struct ssGlobals
{
float gTimeElapsed;
float gTimeDelta;
float gTimeElapsedShifted;
float2 Surface_UVCoord0;
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
uint4 sc_RayTracingCasterConfiguration;
uint4 sc_RayTracingCasterOffsetPNTC;
uint4 sc_RayTracingCasterOffsetTexture;
uint4 sc_RayTracingCasterFormatPNTC;
uint4 sc_RayTracingCasterFormatTexture;
float4 sc_RayTracingRayDirectionSize;
float4 sc_RayTracingRayDirectionDims;
float4 sc_RayTracingRayDirectionView;
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
int alpha_channel;
int red_channel;
int green_channel;
int blue_channel;
int envmap_preview;
float4 baseTexSize;
float4 baseTexDims;
float4 baseTexView;
float3x3 baseTexTransform;
float4 baseTexUvMinMax;
float4 baseTexBorderColor;
float Port_Input1_N010;
float2 Port_Input1_N057;
float Port_Value2_N013;
float Port_Input1_N009;
float Port_Input1_N035;
float Port_Value1_N036;
float Port_Input1_N046;
float Port_Input1_N051;
float Port_Input1_N034;
float Port_Value1_N043;
float Port_Input1_N052;
float Port_Input1_N053;
float4 Port_Default_N055;
float4 Port_Default_N050;
float depthRef;
};
struct sc_RayTracingCasterVertexBuffer_obj
{
float sc_RayTracingCasterVertices[1];
};
struct sc_RayTracingCasterNonAnimatedVertexBuffer_obj
{
float sc_RayTracingCasterNonAnimatedVertices[1];
};
struct sc_RayTracingCasterIndexBuffer_obj
{
uint sc_RayTracingCasterTriangles[1];
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
const device sc_RayTracingCasterIndexBuffer_obj* sc_RayTracingCasterIndexBuffer [[id(0)]];
const device sc_RayTracingCasterVertexBuffer_obj* sc_RayTracingCasterVertexBuffer [[id(1)]];
const device sc_RayTracingCasterNonAnimatedVertexBuffer_obj* sc_RayTracingCasterNonAnimatedVertexBuffer [[id(2)]];
constant sc_Bones_obj* sc_BonesUBO [[id(3)]];
texture2d<float> baseTex [[id(4)]];
texture2d<float> intensityTexture [[id(5)]];
texture2d<uint> sc_RayTracingHitCasterIdAndBarycentric [[id(16)]];
texture2d<float> sc_RayTracingRayDirection [[id(17)]];
texture2d<float> sc_ScreenTexture [[id(19)]];
sampler baseTexSmpSC [[id(22)]];
sampler intensityTextureSmpSC [[id(23)]];
sampler sc_RayTracingHitCasterIdAndBarycentricSmpSC [[id(27)]];
sampler sc_RayTracingRayDirectionSmpSC [[id(28)]];
sampler sc_ScreenTextureSmpSC [[id(30)]];
constant userUniformsObj* UserUniforms [[id(33)]];
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
sc_RayTracingHitPayload sc_RayTracingEvaluateHitPayload(thread const int2& screenPos,constant userUniformsObj& UserUniforms,const device sc_RayTracingCasterVertexBuffer_obj& sc_RayTracingCasterVertexBuffer,const device sc_RayTracingCasterNonAnimatedVertexBuffer_obj& sc_RayTracingCasterNonAnimatedVertexBuffer,const device sc_RayTracingCasterIndexBuffer_obj& sc_RayTracingCasterIndexBuffer,thread texture2d<uint> sc_RayTracingHitCasterIdAndBarycentric,thread sampler sc_RayTracingHitCasterIdAndBarycentricSmpSC,thread texture2d<float> sc_RayTracingRayDirection,thread sampler sc_RayTracingRayDirectionSmpSC)
{
uint4 idAndBarycentric=sc_RayTracingHitCasterIdAndBarycentric.read(uint2(screenPos),0);
sc_RayTracingHitPayload rhp;
rhp.id=idAndBarycentric.xy;
if (rhp.id.x!=(UserUniforms.sc_RayTracingCasterConfiguration.y&65535u))
{
return rhp;
}
float2 brcVW=float2(as_type<half2>(idAndBarycentric.z|(idAndBarycentric.w<<uint(16))));
float3 brc=float3((1.0-brcVW.x)-brcVW.y,brcVW);
float2 param=sc_RayTracingRayDirection.read(uint2(screenPos),0).xy;
float3 l9_0=float3(param.x,param.y,(1.0-abs(param.x))-abs(param.y));
float l9_1=fast::clamp(-l9_0.z,0.0,1.0);
float l9_2;
if (l9_0.x>=0.0)
{
l9_2=-l9_1;
}
else
{
l9_2=l9_1;
}
float l9_3=l9_2;
float l9_4;
if (l9_0.y>=0.0)
{
l9_4=-l9_1;
}
else
{
l9_4=l9_1;
}
float2 l9_5=l9_0.xy+float2(l9_3,l9_4);
l9_0=float3(l9_5.x,l9_5.y,l9_0.z);
float3 l9_6=normalize(l9_0);
float3 rayDir=l9_6;
rhp.viewDirWS=-rayDir;
uint param_1=rhp.id.y;
uint l9_7=min(param_1,UserUniforms.sc_RayTracingCasterConfiguration.z);
uint l9_8=l9_7*6u;
uint l9_9=l9_8&4294967292u;
uint4 l9_10=(uint4(uint2(sc_RayTracingCasterIndexBuffer.sc_RayTracingCasterTriangles[l9_9/4u]),uint2(sc_RayTracingCasterIndexBuffer.sc_RayTracingCasterTriangles[(l9_9/4u)+1u]))&uint4(65535u,4294967295u,65535u,4294967295u))>>uint4(0u,16u,0u,16u);
uint3 l9_11;
if (l9_8==l9_9)
{
l9_11=l9_10.xyz;
}
else
{
l9_11=l9_10.yzw;
}
uint3 l9_12=l9_11;
uint3 i=l9_12;
if (UserUniforms.sc_RayTracingCasterConfiguration.x==2u)
{
float3 param_2=brc;
uint3 param_3=i;
uint param_4=0u;
uint3 l9_13=uint3((param_3*uint3(6u))+uint3(param_4));
uint l9_14=l9_13.x;
float3 l9_15=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_14],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_14+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_14+2u]);
uint l9_16=l9_13.y;
float3 l9_17=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_16],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_16+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_16+2u]);
uint l9_18=l9_13.z;
float3 l9_19=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_18],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_18+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_18+2u]);
float3 l9_20=((l9_15*param_2.x)+(l9_17*param_2.y))+(l9_19*param_2.z);
rhp.positionWS=l9_20;
}
else
{
float3 param_5=brc;
uint3 param_6=i;
uint3 l9_21=uint3((param_6.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.x,(param_6.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.x,(param_6.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.x);
float3 l9_22=float3(0.0);
if (UserUniforms.sc_RayTracingCasterFormatPNTC.x==5u)
{
uint l9_23=l9_21.x;
float3 l9_24=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_23],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_23+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_23+2u]);
uint l9_25=l9_21.y;
float3 l9_26=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_25],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_25+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_25+2u]);
uint l9_27=l9_21.z;
float3 l9_28=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_27],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_27+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_27+2u]);
l9_22=((l9_24*param_5.x)+(l9_26*param_5.y))+(l9_28*param_5.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.x==6u)
{
uint l9_29=l9_21.x;
float3 l9_30=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_29]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_29+1u]))).x);
uint l9_31=l9_21.y;
float3 l9_32=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_31]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_31+1u]))).x);
uint l9_33=l9_21.z;
float3 l9_34=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_33]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_33+1u]))).x);
l9_22=((l9_30*param_5.x)+(l9_32*param_5.y))+(l9_34*param_5.z);
}
else
{
l9_22=float3(1.0,0.0,0.0);
}
}
float3 l9_35=l9_22;
float3 positionOS=l9_35;
rhp.positionWS=(UserUniforms.sc_ModelMatrix*float4(positionOS,1.0)).xyz;
}
if (UserUniforms.sc_RayTracingCasterOffsetPNTC.y>0u)
{
if (UserUniforms.sc_RayTracingCasterConfiguration.x==2u)
{
float3 param_7=brc;
uint3 param_8=i;
uint param_9=3u;
uint3 l9_36=uint3((param_8*uint3(6u))+uint3(param_9));
uint l9_37=l9_36.x;
float3 l9_38=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_37],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_37+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_37+2u]);
uint l9_39=l9_36.y;
float3 l9_40=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_39],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_39+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_39+2u]);
uint l9_41=l9_36.z;
float3 l9_42=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_41],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_41+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_41+2u]);
float3 l9_43=((l9_38*param_7.x)+(l9_40*param_7.y))+(l9_42*param_7.z);
rhp.normalWS=l9_43;
}
else
{
float3 param_10=brc;
uint3 param_11=i;
uint3 l9_44=uint3((param_11.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.y,(param_11.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.y,(param_11.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.y);
float3 l9_45=float3(0.0);
if (UserUniforms.sc_RayTracingCasterFormatPNTC.y==5u)
{
uint l9_46=l9_44.x;
float3 l9_47=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_46],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_46+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_46+2u]);
uint l9_48=l9_44.y;
float3 l9_49=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_48],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_48+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_48+2u]);
uint l9_50=l9_44.z;
float3 l9_51=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_50],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_50+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_50+2u]);
l9_45=((l9_47*param_10.x)+(l9_49*param_10.y))+(l9_51*param_10.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.y==6u)
{
uint l9_52=l9_44.x;
float3 l9_53=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_52]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_52+1u]))).x);
uint l9_54=l9_44.y;
float3 l9_55=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_54]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_54+1u]))).x);
uint l9_56=l9_44.z;
float3 l9_57=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_56]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_56+1u]))).x);
l9_45=((l9_53*param_10.x)+(l9_55*param_10.y))+(l9_57*param_10.z);
}
else
{
l9_45=float3(1.0,0.0,0.0);
}
}
float3 l9_58=l9_45;
float3 normalOS=l9_58;
rhp.normalWS=normalize(UserUniforms.sc_NormalMatrix*normalOS);
}
}
else
{
rhp.normalWS=float3(1.0,0.0,0.0);
}
bool l9_59=!(UserUniforms.sc_RayTracingCasterConfiguration.x==2u);
bool l9_60;
if (l9_59)
{
l9_60=UserUniforms.sc_RayTracingCasterOffsetPNTC.z>0u;
}
else
{
l9_60=l9_59;
}
if (l9_60)
{
float3 param_12=brc;
uint3 param_13=i;
uint3 l9_61=uint3((param_13.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.z,(param_13.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.z,(param_13.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.z);
float4 l9_62=float4(0.0);
if (UserUniforms.sc_RayTracingCasterFormatPNTC.z==5u)
{
uint l9_63=l9_61.x;
float4 l9_64=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_63],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_63+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_63+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_63+3u]);
uint l9_65=l9_61.y;
float4 l9_66=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_65],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_65+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_65+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_65+3u]);
uint l9_67=l9_61.z;
float4 l9_68=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_67],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_67+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_67+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_67+3u]);
l9_62=((l9_64*param_12.x)+(l9_66*param_12.y))+(l9_68*param_12.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.z==6u)
{
uint l9_69=l9_61.x;
float4 l9_70=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_69]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_69+1u]))));
uint l9_71=l9_61.y;
float4 l9_72=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_71]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_71+1u]))));
uint l9_73=l9_61.z;
float4 l9_74=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_73]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_73+1u]))));
l9_62=((l9_70*param_12.x)+(l9_72*param_12.y))+(l9_74*param_12.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.z==2u)
{
uint l9_75=l9_61.x;
uint l9_76=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_75]);
uint l9_77=l9_76&255u;
uint l9_78=(l9_76>>uint(8))&255u;
uint l9_79=(l9_76>>uint(16))&255u;
uint l9_80=(l9_76>>uint(24))&255u;
float4 l9_81=float4(float(l9_77),float(l9_78),float(l9_79),float(l9_80))/float4(255.0);
uint l9_82=l9_61.y;
uint l9_83=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_82]);
uint l9_84=l9_83&255u;
uint l9_85=(l9_83>>uint(8))&255u;
uint l9_86=(l9_83>>uint(16))&255u;
uint l9_87=(l9_83>>uint(24))&255u;
float4 l9_88=float4(float(l9_84),float(l9_85),float(l9_86),float(l9_87))/float4(255.0);
uint l9_89=l9_61.z;
uint l9_90=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_89]);
uint l9_91=l9_90&255u;
uint l9_92=(l9_90>>uint(8))&255u;
uint l9_93=(l9_90>>uint(16))&255u;
uint l9_94=(l9_90>>uint(24))&255u;
float4 l9_95=float4(float(l9_91),float(l9_92),float(l9_93),float(l9_94))/float4(255.0);
l9_62=((l9_81*param_12.x)+(l9_88*param_12.y))+(l9_95*param_12.z);
}
else
{
l9_62=float4(1.0,0.0,0.0,0.0);
}
}
}
float4 l9_96=l9_62;
float4 tangentOS=l9_96;
float3 tangentWS=normalize(UserUniforms.sc_NormalMatrix*tangentOS.xyz);
rhp.tangentWS=float4(tangentWS,tangentOS.w);
}
else
{
rhp.tangentWS=float4(1.0,0.0,0.0,1.0);
}
if (UserUniforms.sc_RayTracingCasterFormatPNTC.w>0u)
{
float3 param_14=brc;
uint3 param_15=i;
uint3 l9_97=uint3((param_15.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.w,(param_15.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.w,(param_15.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.w);
float4 l9_98=float4(0.0);
if (UserUniforms.sc_RayTracingCasterFormatPNTC.w==5u)
{
uint l9_99=l9_97.x;
float4 l9_100=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_99],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_99+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_99+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_99+3u]);
uint l9_101=l9_97.y;
float4 l9_102=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_101],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_101+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_101+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_101+3u]);
uint l9_103=l9_97.z;
float4 l9_104=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_103],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_103+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_103+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_103+3u]);
l9_98=((l9_100*param_14.x)+(l9_102*param_14.y))+(l9_104*param_14.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.w==6u)
{
uint l9_105=l9_97.x;
float4 l9_106=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_105]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_105+1u]))));
uint l9_107=l9_97.y;
float4 l9_108=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_107]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_107+1u]))));
uint l9_109=l9_97.z;
float4 l9_110=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_109]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_109+1u]))));
l9_98=((l9_106*param_14.x)+(l9_108*param_14.y))+(l9_110*param_14.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.w==2u)
{
uint l9_111=l9_97.x;
uint l9_112=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_111]);
uint l9_113=l9_112&255u;
uint l9_114=(l9_112>>uint(8))&255u;
uint l9_115=(l9_112>>uint(16))&255u;
uint l9_116=(l9_112>>uint(24))&255u;
float4 l9_117=float4(float(l9_113),float(l9_114),float(l9_115),float(l9_116))/float4(255.0);
uint l9_118=l9_97.y;
uint l9_119=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_118]);
uint l9_120=l9_119&255u;
uint l9_121=(l9_119>>uint(8))&255u;
uint l9_122=(l9_119>>uint(16))&255u;
uint l9_123=(l9_119>>uint(24))&255u;
float4 l9_124=float4(float(l9_120),float(l9_121),float(l9_122),float(l9_123))/float4(255.0);
uint l9_125=l9_97.z;
uint l9_126=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_125]);
uint l9_127=l9_126&255u;
uint l9_128=(l9_126>>uint(8))&255u;
uint l9_129=(l9_126>>uint(16))&255u;
uint l9_130=(l9_126>>uint(24))&255u;
float4 l9_131=float4(float(l9_127),float(l9_128),float(l9_129),float(l9_130))/float4(255.0);
l9_98=((l9_117*param_14.x)+(l9_124*param_14.y))+(l9_131*param_14.z);
}
else
{
l9_98=float4(1.0,0.0,0.0,0.0);
}
}
}
float4 l9_132=l9_98;
rhp.color=l9_132;
}
float2 dummyRedBlack=float2(dot(brc,float3(uint3(1u)-(i%uint3(2u)))),0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.x>0u)
{
float3 param_16=brc;
uint3 param_17=i;
uint3 l9_133=uint3((param_17.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.x,(param_17.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.x,(param_17.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.x);
float2 l9_134=float2(0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.x==5u)
{
uint l9_135=l9_133.x;
float2 l9_136=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_135],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_135+1u]);
uint l9_137=l9_133.y;
float2 l9_138=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_137],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_137+1u]);
uint l9_139=l9_133.z;
float2 l9_140=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_139],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_139+1u]);
l9_134=((l9_136*param_16.x)+(l9_138*param_16.y))+(l9_140*param_16.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatTexture.x==6u)
{
uint l9_141=l9_133.x;
float2 l9_142=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_141])));
uint l9_143=l9_133.y;
float2 l9_144=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_143])));
uint l9_145=l9_133.z;
float2 l9_146=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_145])));
l9_134=((l9_142*param_16.x)+(l9_144*param_16.y))+(l9_146*param_16.z);
}
else
{
l9_134=float2(1.0,0.0);
}
}
float2 l9_147=l9_134;
rhp.uv0=l9_147;
}
else
{
rhp.uv0=dummyRedBlack;
}
if (UserUniforms.sc_RayTracingCasterFormatTexture.y>0u)
{
float3 param_18=brc;
uint3 param_19=i;
uint3 l9_148=uint3((param_19.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.y,(param_19.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.y,(param_19.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.y);
float2 l9_149=float2(0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.y==5u)
{
uint l9_150=l9_148.x;
float2 l9_151=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_150],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_150+1u]);
uint l9_152=l9_148.y;
float2 l9_153=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_152],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_152+1u]);
uint l9_154=l9_148.z;
float2 l9_155=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_154],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_154+1u]);
l9_149=((l9_151*param_18.x)+(l9_153*param_18.y))+(l9_155*param_18.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatTexture.y==6u)
{
uint l9_156=l9_148.x;
float2 l9_157=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_156])));
uint l9_158=l9_148.y;
float2 l9_159=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_158])));
uint l9_160=l9_148.z;
float2 l9_161=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_160])));
l9_149=((l9_157*param_18.x)+(l9_159*param_18.y))+(l9_161*param_18.z);
}
else
{
l9_149=float2(1.0,0.0);
}
}
float2 l9_162=l9_149;
rhp.uv1=l9_162;
}
else
{
rhp.uv1=dummyRedBlack;
}
if (UserUniforms.sc_RayTracingCasterFormatTexture.z>0u)
{
float3 param_20=brc;
uint3 param_21=i;
uint3 l9_163=uint3((param_21.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.z,(param_21.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.z,(param_21.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.z);
float2 l9_164=float2(0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.z==5u)
{
uint l9_165=l9_163.x;
float2 l9_166=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_165],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_165+1u]);
uint l9_167=l9_163.y;
float2 l9_168=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_167],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_167+1u]);
uint l9_169=l9_163.z;
float2 l9_170=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_169],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_169+1u]);
l9_164=((l9_166*param_20.x)+(l9_168*param_20.y))+(l9_170*param_20.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatTexture.z==6u)
{
uint l9_171=l9_163.x;
float2 l9_172=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_171])));
uint l9_173=l9_163.y;
float2 l9_174=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_173])));
uint l9_175=l9_163.z;
float2 l9_176=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_175])));
l9_164=((l9_172*param_20.x)+(l9_174*param_20.y))+(l9_176*param_20.z);
}
else
{
l9_164=float2(1.0,0.0);
}
}
float2 l9_177=l9_164;
rhp.uv2=l9_177;
}
else
{
rhp.uv2=dummyRedBlack;
}
if (UserUniforms.sc_RayTracingCasterFormatTexture.w>0u)
{
float3 param_22=brc;
uint3 param_23=i;
uint3 l9_178=uint3((param_23.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.w,(param_23.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.w,(param_23.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.w);
float2 l9_179=float2(0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.w==5u)
{
uint l9_180=l9_178.x;
float2 l9_181=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_180],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_180+1u]);
uint l9_182=l9_178.y;
float2 l9_183=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_182],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_182+1u]);
uint l9_184=l9_178.z;
float2 l9_185=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_184],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_184+1u]);
l9_179=((l9_181*param_22.x)+(l9_183*param_22.y))+(l9_185*param_22.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatTexture.w==6u)
{
uint l9_186=l9_178.x;
float2 l9_187=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_186])));
uint l9_188=l9_178.y;
float2 l9_189=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_188])));
uint l9_190=l9_178.z;
float2 l9_191=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_190])));
l9_179=((l9_187*param_22.x)+(l9_189*param_22.y))+(l9_191*param_22.z);
}
else
{
l9_179=float2(1.0,0.0);
}
}
float2 l9_192=l9_179;
rhp.uv3=l9_192;
}
else
{
rhp.uv3=dummyRedBlack;
}
return rhp;
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
float4 N16_Value1=float4(0.0);
float4 N16_Result=float4(0.0);
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
if ((*sc_set0.UserUniforms).sc_RayTracingCasterConfiguration.x!=0u)
{
float4 l9_0=gl_FragCoord;
int2 param=int2(l9_0.xy);
sc_RayTracingHitPayload rhp=sc_RayTracingEvaluateHitPayload(param,(*sc_set0.UserUniforms),(*sc_set0.sc_RayTracingCasterVertexBuffer),(*sc_set0.sc_RayTracingCasterNonAnimatedVertexBuffer),(*sc_set0.sc_RayTracingCasterIndexBuffer),sc_set0.sc_RayTracingHitCasterIdAndBarycentric,sc_set0.sc_RayTracingHitCasterIdAndBarycentricSmpSC,sc_set0.sc_RayTracingRayDirection,sc_set0.sc_RayTracingRayDirectionSmpSC);
if (rhp.id.x!=((*sc_set0.UserUniforms).sc_RayTracingCasterConfiguration.y&65535u))
{
return out;
}
Globals.Surface_UVCoord0=rhp.uv0;
}
else
{
Globals.Surface_UVCoord0=in.varTex01.xy;
}
float4 Result_N11=float4(0.0);
float param_1=0.0;
float4 param_2=float4(0.0);
float4 param_3=float4(0.68215501,0.39855,0.51477802,0.0);
ssGlobals param_5=Globals;
float l9_1=0.0;
float l9_2=float((*sc_set0.UserUniforms).alpha_channel!=0);
l9_1=l9_2;
float l9_3=0.0;
float l9_4=float((*sc_set0.UserUniforms).red_channel!=0);
l9_3=l9_4;
float l9_5=0.0;
float l9_6=float((*sc_set0.UserUniforms).green_channel!=0);
l9_5=l9_6;
float l9_7=0.0;
float l9_8=float((*sc_set0.UserUniforms).blue_channel!=0);
l9_7=l9_8;
float l9_9=0.0;
l9_9=(l9_3+l9_5)+l9_7;
float l9_10=0.0;
l9_10=float(l9_9<(*sc_set0.UserUniforms).Port_Input1_N010);
float l9_11=0.0;
float l9_12=l9_1;
bool l9_13=(l9_12*1.0)!=0.0;
bool l9_14;
if (l9_13)
{
l9_14=(l9_10*1.0)!=0.0;
}
else
{
l9_14=l9_13;
}
l9_11=float(l9_14);
param_1=l9_11;
float4 param_4;
if ((param_1*1.0)!=0.0)
{
float4 l9_15=float4(0.0);
float l9_16=0.0;
float4 l9_17=float4(0.0);
float4 l9_18=float4(0.0);
ssGlobals l9_19=param_5;
float l9_20=0.0;
float l9_21=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_20=l9_21;
l9_16=l9_20;
float4 l9_22;
if ((l9_16*1.0)!=0.0)
{
float2 l9_23=float2(0.0);
l9_23=l9_19.Surface_UVCoord0;
float2 l9_24=float2(0.0);
l9_24=l9_23*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_25=float4(0.0);
int l9_26;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_27=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_27=0;
}
else
{
l9_27=in.varStereoViewID;
}
int l9_28=l9_27;
l9_26=1-l9_28;
}
else
{
int l9_29=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_29=0;
}
else
{
l9_29=in.varStereoViewID;
}
int l9_30=l9_29;
l9_26=l9_30;
}
int l9_31=l9_26;
int l9_32=baseTexLayout_tmp;
int l9_33=l9_31;
float2 l9_34=l9_24;
bool l9_35=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_36=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_37=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_38=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_39=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_40=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_41=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_42=0.0;
bool l9_43=l9_40&&(!l9_38);
float l9_44=1.0;
float l9_45=l9_34.x;
int l9_46=l9_37.x;
if (l9_46==1)
{
l9_45=fract(l9_45);
}
else
{
if (l9_46==2)
{
float l9_47=fract(l9_45);
float l9_48=l9_45-l9_47;
float l9_49=step(0.25,fract(l9_48*0.5));
l9_45=mix(l9_47,1.0-l9_47,fast::clamp(l9_49,0.0,1.0));
}
}
l9_34.x=l9_45;
float l9_50=l9_34.y;
int l9_51=l9_37.y;
if (l9_51==1)
{
l9_50=fract(l9_50);
}
else
{
if (l9_51==2)
{
float l9_52=fract(l9_50);
float l9_53=l9_50-l9_52;
float l9_54=step(0.25,fract(l9_53*0.5));
l9_50=mix(l9_52,1.0-l9_52,fast::clamp(l9_54,0.0,1.0));
}
}
l9_34.y=l9_50;
if (l9_38)
{
bool l9_55=l9_40;
bool l9_56;
if (l9_55)
{
l9_56=l9_37.x==3;
}
else
{
l9_56=l9_55;
}
float l9_57=l9_34.x;
float l9_58=l9_39.x;
float l9_59=l9_39.z;
bool l9_60=l9_56;
float l9_61=l9_44;
float l9_62=fast::clamp(l9_57,l9_58,l9_59);
float l9_63=step(abs(l9_57-l9_62),9.9999997e-06);
l9_61*=(l9_63+((1.0-float(l9_60))*(1.0-l9_63)));
l9_57=l9_62;
l9_34.x=l9_57;
l9_44=l9_61;
bool l9_64=l9_40;
bool l9_65;
if (l9_64)
{
l9_65=l9_37.y==3;
}
else
{
l9_65=l9_64;
}
float l9_66=l9_34.y;
float l9_67=l9_39.y;
float l9_68=l9_39.w;
bool l9_69=l9_65;
float l9_70=l9_44;
float l9_71=fast::clamp(l9_66,l9_67,l9_68);
float l9_72=step(abs(l9_66-l9_71),9.9999997e-06);
l9_70*=(l9_72+((1.0-float(l9_69))*(1.0-l9_72)));
l9_66=l9_71;
l9_34.y=l9_66;
l9_44=l9_70;
}
float2 l9_73=l9_34;
bool l9_74=l9_35;
float3x3 l9_75=l9_36;
if (l9_74)
{
l9_73=float2((l9_75*float3(l9_73,1.0)).xy);
}
float2 l9_76=l9_73;
l9_34=l9_76;
float l9_77=l9_34.x;
int l9_78=l9_37.x;
bool l9_79=l9_43;
float l9_80=l9_44;
if ((l9_78==0)||(l9_78==3))
{
float l9_81=l9_77;
float l9_82=0.0;
float l9_83=1.0;
bool l9_84=l9_79;
float l9_85=l9_80;
float l9_86=fast::clamp(l9_81,l9_82,l9_83);
float l9_87=step(abs(l9_81-l9_86),9.9999997e-06);
l9_85*=(l9_87+((1.0-float(l9_84))*(1.0-l9_87)));
l9_81=l9_86;
l9_77=l9_81;
l9_80=l9_85;
}
l9_34.x=l9_77;
l9_44=l9_80;
float l9_88=l9_34.y;
int l9_89=l9_37.y;
bool l9_90=l9_43;
float l9_91=l9_44;
if ((l9_89==0)||(l9_89==3))
{
float l9_92=l9_88;
float l9_93=0.0;
float l9_94=1.0;
bool l9_95=l9_90;
float l9_96=l9_91;
float l9_97=fast::clamp(l9_92,l9_93,l9_94);
float l9_98=step(abs(l9_92-l9_97),9.9999997e-06);
l9_96*=(l9_98+((1.0-float(l9_95))*(1.0-l9_98)));
l9_92=l9_97;
l9_88=l9_92;
l9_91=l9_96;
}
l9_34.y=l9_88;
l9_44=l9_91;
float2 l9_99=l9_34;
int l9_100=l9_32;
int l9_101=l9_33;
float l9_102=l9_42;
float2 l9_103=l9_99;
int l9_104=l9_100;
int l9_105=l9_101;
float3 l9_106=float3(0.0);
if (l9_104==0)
{
l9_106=float3(l9_103,0.0);
}
else
{
if (l9_104==1)
{
l9_106=float3(l9_103.x,(l9_103.y*0.5)+(0.5-(float(l9_105)*0.5)),0.0);
}
else
{
l9_106=float3(l9_103,float(l9_105));
}
}
float3 l9_107=l9_106;
float3 l9_108=l9_107;
float4 l9_109=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_108.xy,bias(l9_102));
float4 l9_110=l9_109;
if (l9_40)
{
l9_110=mix(l9_41,l9_110,float4(l9_44));
}
float4 l9_111=l9_110;
l9_25=l9_111;
float4 l9_112=float4(0.0);
float4 l9_113=l9_25;
float4 l9_114=float4(0.0);
N16_Value1=l9_113;
float3 l9_115=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_115.x,l9_115.y,l9_115.z,N16_Result.w);
N16_Result.w=1.0;
l9_114=N16_Result;
l9_112=l9_114;
float4 l9_116=float4(0.0);
float3 l9_117=l9_112.xyz;
float l9_118=1.8;
float l9_119=1.4;
float l9_120=0.5;
float l9_121=1.5;
float3 l9_122=(l9_117*((l9_117*l9_118)+float3(l9_119)))/((l9_117*((l9_117*l9_118)+float3(l9_120)))+float3(l9_121));
l9_116=float4(l9_122,l9_112.w);
float4 l9_123=float4(0.0);
float4 l9_124=l9_116;
float4 l9_125;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_125=float4(pow(l9_124.x,0.45454544),pow(l9_124.y,0.45454544),pow(l9_124.z,0.45454544),pow(l9_124.w,0.45454544));
}
else
{
l9_125=sqrt(l9_124);
}
float4 l9_126=l9_125;
l9_123=l9_126;
l9_17=l9_123;
l9_22=l9_17;
}
else
{
float2 l9_127=float2(0.0);
l9_127=l9_19.Surface_UVCoord0;
float2 l9_128=float2(0.0);
l9_128=l9_127*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_129=float4(0.0);
int l9_130;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_131=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_131=0;
}
else
{
l9_131=in.varStereoViewID;
}
int l9_132=l9_131;
l9_130=1-l9_132;
}
else
{
int l9_133=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_133=0;
}
else
{
l9_133=in.varStereoViewID;
}
int l9_134=l9_133;
l9_130=l9_134;
}
int l9_135=l9_130;
int l9_136=baseTexLayout_tmp;
int l9_137=l9_135;
float2 l9_138=l9_128;
bool l9_139=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_140=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_141=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_142=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_143=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_144=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_145=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_146=0.0;
bool l9_147=l9_144&&(!l9_142);
float l9_148=1.0;
float l9_149=l9_138.x;
int l9_150=l9_141.x;
if (l9_150==1)
{
l9_149=fract(l9_149);
}
else
{
if (l9_150==2)
{
float l9_151=fract(l9_149);
float l9_152=l9_149-l9_151;
float l9_153=step(0.25,fract(l9_152*0.5));
l9_149=mix(l9_151,1.0-l9_151,fast::clamp(l9_153,0.0,1.0));
}
}
l9_138.x=l9_149;
float l9_154=l9_138.y;
int l9_155=l9_141.y;
if (l9_155==1)
{
l9_154=fract(l9_154);
}
else
{
if (l9_155==2)
{
float l9_156=fract(l9_154);
float l9_157=l9_154-l9_156;
float l9_158=step(0.25,fract(l9_157*0.5));
l9_154=mix(l9_156,1.0-l9_156,fast::clamp(l9_158,0.0,1.0));
}
}
l9_138.y=l9_154;
if (l9_142)
{
bool l9_159=l9_144;
bool l9_160;
if (l9_159)
{
l9_160=l9_141.x==3;
}
else
{
l9_160=l9_159;
}
float l9_161=l9_138.x;
float l9_162=l9_143.x;
float l9_163=l9_143.z;
bool l9_164=l9_160;
float l9_165=l9_148;
float l9_166=fast::clamp(l9_161,l9_162,l9_163);
float l9_167=step(abs(l9_161-l9_166),9.9999997e-06);
l9_165*=(l9_167+((1.0-float(l9_164))*(1.0-l9_167)));
l9_161=l9_166;
l9_138.x=l9_161;
l9_148=l9_165;
bool l9_168=l9_144;
bool l9_169;
if (l9_168)
{
l9_169=l9_141.y==3;
}
else
{
l9_169=l9_168;
}
float l9_170=l9_138.y;
float l9_171=l9_143.y;
float l9_172=l9_143.w;
bool l9_173=l9_169;
float l9_174=l9_148;
float l9_175=fast::clamp(l9_170,l9_171,l9_172);
float l9_176=step(abs(l9_170-l9_175),9.9999997e-06);
l9_174*=(l9_176+((1.0-float(l9_173))*(1.0-l9_176)));
l9_170=l9_175;
l9_138.y=l9_170;
l9_148=l9_174;
}
float2 l9_177=l9_138;
bool l9_178=l9_139;
float3x3 l9_179=l9_140;
if (l9_178)
{
l9_177=float2((l9_179*float3(l9_177,1.0)).xy);
}
float2 l9_180=l9_177;
l9_138=l9_180;
float l9_181=l9_138.x;
int l9_182=l9_141.x;
bool l9_183=l9_147;
float l9_184=l9_148;
if ((l9_182==0)||(l9_182==3))
{
float l9_185=l9_181;
float l9_186=0.0;
float l9_187=1.0;
bool l9_188=l9_183;
float l9_189=l9_184;
float l9_190=fast::clamp(l9_185,l9_186,l9_187);
float l9_191=step(abs(l9_185-l9_190),9.9999997e-06);
l9_189*=(l9_191+((1.0-float(l9_188))*(1.0-l9_191)));
l9_185=l9_190;
l9_181=l9_185;
l9_184=l9_189;
}
l9_138.x=l9_181;
l9_148=l9_184;
float l9_192=l9_138.y;
int l9_193=l9_141.y;
bool l9_194=l9_147;
float l9_195=l9_148;
if ((l9_193==0)||(l9_193==3))
{
float l9_196=l9_192;
float l9_197=0.0;
float l9_198=1.0;
bool l9_199=l9_194;
float l9_200=l9_195;
float l9_201=fast::clamp(l9_196,l9_197,l9_198);
float l9_202=step(abs(l9_196-l9_201),9.9999997e-06);
l9_200*=(l9_202+((1.0-float(l9_199))*(1.0-l9_202)));
l9_196=l9_201;
l9_192=l9_196;
l9_195=l9_200;
}
l9_138.y=l9_192;
l9_148=l9_195;
float2 l9_203=l9_138;
int l9_204=l9_136;
int l9_205=l9_137;
float l9_206=l9_146;
float2 l9_207=l9_203;
int l9_208=l9_204;
int l9_209=l9_205;
float3 l9_210=float3(0.0);
if (l9_208==0)
{
l9_210=float3(l9_207,0.0);
}
else
{
if (l9_208==1)
{
l9_210=float3(l9_207.x,(l9_207.y*0.5)+(0.5-(float(l9_209)*0.5)),0.0);
}
else
{
l9_210=float3(l9_207,float(l9_209));
}
}
float3 l9_211=l9_210;
float3 l9_212=l9_211;
float4 l9_213=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_212.xy,bias(l9_206));
float4 l9_214=l9_213;
if (l9_144)
{
l9_214=mix(l9_145,l9_214,float4(l9_148));
}
float4 l9_215=l9_214;
l9_129=l9_215;
l9_18=l9_129;
l9_22=l9_18;
}
l9_15=l9_22;
float l9_216=0.0;
l9_216=l9_15.w;
float4 l9_217=float4(0.0);
float3 l9_218=float3(l9_216);
l9_217=float4(l9_218.x,l9_218.y,l9_218.z,l9_217.w);
l9_217.w=(*sc_set0.UserUniforms).Port_Value2_N013;
param_2=l9_217;
param_4=param_2;
}
else
{
float4 l9_219=float4(0.0);
float l9_220=0.0;
float4 l9_221=float4(0.0);
float4 l9_222=float4(0.68215501,0.39855,0.51477802,0.0);
ssGlobals l9_223=param_5;
float l9_224=0.0;
float l9_225=float((*sc_set0.UserUniforms).red_channel!=0);
l9_224=l9_225;
float l9_226=0.0;
float l9_227=float((*sc_set0.UserUniforms).green_channel!=0);
l9_226=l9_227;
float l9_228=0.0;
float l9_229=float((*sc_set0.UserUniforms).blue_channel!=0);
l9_228=l9_229;
float l9_230=0.0;
l9_230=(l9_224+l9_226)+l9_228;
float l9_231=0.0;
l9_231=float(l9_230>(*sc_set0.UserUniforms).Port_Input1_N009);
l9_220=l9_231;
float4 l9_232;
if ((l9_220*1.0)!=0.0)
{
float l9_233=0.0;
float l9_234=float((*sc_set0.UserUniforms).red_channel!=0);
l9_233=l9_234;
float4 l9_235=float4(0.0);
float l9_236=0.0;
float4 l9_237=float4(0.0);
float4 l9_238=float4(0.0);
ssGlobals l9_239=l9_223;
float l9_240=0.0;
float l9_241=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_240=l9_241;
l9_236=l9_240;
float4 l9_242;
if ((l9_236*1.0)!=0.0)
{
float2 l9_243=float2(0.0);
l9_243=l9_239.Surface_UVCoord0;
float2 l9_244=float2(0.0);
l9_244=l9_243*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_245=float4(0.0);
int l9_246;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_247=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_247=0;
}
else
{
l9_247=in.varStereoViewID;
}
int l9_248=l9_247;
l9_246=1-l9_248;
}
else
{
int l9_249=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_249=0;
}
else
{
l9_249=in.varStereoViewID;
}
int l9_250=l9_249;
l9_246=l9_250;
}
int l9_251=l9_246;
int l9_252=baseTexLayout_tmp;
int l9_253=l9_251;
float2 l9_254=l9_244;
bool l9_255=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_256=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_257=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_258=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_259=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_260=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_261=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_262=0.0;
bool l9_263=l9_260&&(!l9_258);
float l9_264=1.0;
float l9_265=l9_254.x;
int l9_266=l9_257.x;
if (l9_266==1)
{
l9_265=fract(l9_265);
}
else
{
if (l9_266==2)
{
float l9_267=fract(l9_265);
float l9_268=l9_265-l9_267;
float l9_269=step(0.25,fract(l9_268*0.5));
l9_265=mix(l9_267,1.0-l9_267,fast::clamp(l9_269,0.0,1.0));
}
}
l9_254.x=l9_265;
float l9_270=l9_254.y;
int l9_271=l9_257.y;
if (l9_271==1)
{
l9_270=fract(l9_270);
}
else
{
if (l9_271==2)
{
float l9_272=fract(l9_270);
float l9_273=l9_270-l9_272;
float l9_274=step(0.25,fract(l9_273*0.5));
l9_270=mix(l9_272,1.0-l9_272,fast::clamp(l9_274,0.0,1.0));
}
}
l9_254.y=l9_270;
if (l9_258)
{
bool l9_275=l9_260;
bool l9_276;
if (l9_275)
{
l9_276=l9_257.x==3;
}
else
{
l9_276=l9_275;
}
float l9_277=l9_254.x;
float l9_278=l9_259.x;
float l9_279=l9_259.z;
bool l9_280=l9_276;
float l9_281=l9_264;
float l9_282=fast::clamp(l9_277,l9_278,l9_279);
float l9_283=step(abs(l9_277-l9_282),9.9999997e-06);
l9_281*=(l9_283+((1.0-float(l9_280))*(1.0-l9_283)));
l9_277=l9_282;
l9_254.x=l9_277;
l9_264=l9_281;
bool l9_284=l9_260;
bool l9_285;
if (l9_284)
{
l9_285=l9_257.y==3;
}
else
{
l9_285=l9_284;
}
float l9_286=l9_254.y;
float l9_287=l9_259.y;
float l9_288=l9_259.w;
bool l9_289=l9_285;
float l9_290=l9_264;
float l9_291=fast::clamp(l9_286,l9_287,l9_288);
float l9_292=step(abs(l9_286-l9_291),9.9999997e-06);
l9_290*=(l9_292+((1.0-float(l9_289))*(1.0-l9_292)));
l9_286=l9_291;
l9_254.y=l9_286;
l9_264=l9_290;
}
float2 l9_293=l9_254;
bool l9_294=l9_255;
float3x3 l9_295=l9_256;
if (l9_294)
{
l9_293=float2((l9_295*float3(l9_293,1.0)).xy);
}
float2 l9_296=l9_293;
l9_254=l9_296;
float l9_297=l9_254.x;
int l9_298=l9_257.x;
bool l9_299=l9_263;
float l9_300=l9_264;
if ((l9_298==0)||(l9_298==3))
{
float l9_301=l9_297;
float l9_302=0.0;
float l9_303=1.0;
bool l9_304=l9_299;
float l9_305=l9_300;
float l9_306=fast::clamp(l9_301,l9_302,l9_303);
float l9_307=step(abs(l9_301-l9_306),9.9999997e-06);
l9_305*=(l9_307+((1.0-float(l9_304))*(1.0-l9_307)));
l9_301=l9_306;
l9_297=l9_301;
l9_300=l9_305;
}
l9_254.x=l9_297;
l9_264=l9_300;
float l9_308=l9_254.y;
int l9_309=l9_257.y;
bool l9_310=l9_263;
float l9_311=l9_264;
if ((l9_309==0)||(l9_309==3))
{
float l9_312=l9_308;
float l9_313=0.0;
float l9_314=1.0;
bool l9_315=l9_310;
float l9_316=l9_311;
float l9_317=fast::clamp(l9_312,l9_313,l9_314);
float l9_318=step(abs(l9_312-l9_317),9.9999997e-06);
l9_316*=(l9_318+((1.0-float(l9_315))*(1.0-l9_318)));
l9_312=l9_317;
l9_308=l9_312;
l9_311=l9_316;
}
l9_254.y=l9_308;
l9_264=l9_311;
float2 l9_319=l9_254;
int l9_320=l9_252;
int l9_321=l9_253;
float l9_322=l9_262;
float2 l9_323=l9_319;
int l9_324=l9_320;
int l9_325=l9_321;
float3 l9_326=float3(0.0);
if (l9_324==0)
{
l9_326=float3(l9_323,0.0);
}
else
{
if (l9_324==1)
{
l9_326=float3(l9_323.x,(l9_323.y*0.5)+(0.5-(float(l9_325)*0.5)),0.0);
}
else
{
l9_326=float3(l9_323,float(l9_325));
}
}
float3 l9_327=l9_326;
float3 l9_328=l9_327;
float4 l9_329=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_328.xy,bias(l9_322));
float4 l9_330=l9_329;
if (l9_260)
{
l9_330=mix(l9_261,l9_330,float4(l9_264));
}
float4 l9_331=l9_330;
l9_245=l9_331;
float4 l9_332=float4(0.0);
float4 l9_333=l9_245;
float4 l9_334=float4(0.0);
N16_Value1=l9_333;
float3 l9_335=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_335.x,l9_335.y,l9_335.z,N16_Result.w);
N16_Result.w=1.0;
l9_334=N16_Result;
l9_332=l9_334;
float4 l9_336=float4(0.0);
float3 l9_337=l9_332.xyz;
float l9_338=1.8;
float l9_339=1.4;
float l9_340=0.5;
float l9_341=1.5;
float3 l9_342=(l9_337*((l9_337*l9_338)+float3(l9_339)))/((l9_337*((l9_337*l9_338)+float3(l9_340)))+float3(l9_341));
l9_336=float4(l9_342,l9_332.w);
float4 l9_343=float4(0.0);
float4 l9_344=l9_336;
float4 l9_345;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_345=float4(pow(l9_344.x,0.45454544),pow(l9_344.y,0.45454544),pow(l9_344.z,0.45454544),pow(l9_344.w,0.45454544));
}
else
{
l9_345=sqrt(l9_344);
}
float4 l9_346=l9_345;
l9_343=l9_346;
l9_237=l9_343;
l9_242=l9_237;
}
else
{
float2 l9_347=float2(0.0);
l9_347=l9_239.Surface_UVCoord0;
float2 l9_348=float2(0.0);
l9_348=l9_347*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_349=float4(0.0);
int l9_350;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_351=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_351=0;
}
else
{
l9_351=in.varStereoViewID;
}
int l9_352=l9_351;
l9_350=1-l9_352;
}
else
{
int l9_353=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_353=0;
}
else
{
l9_353=in.varStereoViewID;
}
int l9_354=l9_353;
l9_350=l9_354;
}
int l9_355=l9_350;
int l9_356=baseTexLayout_tmp;
int l9_357=l9_355;
float2 l9_358=l9_348;
bool l9_359=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_360=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_361=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_362=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_363=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_364=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_365=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_366=0.0;
bool l9_367=l9_364&&(!l9_362);
float l9_368=1.0;
float l9_369=l9_358.x;
int l9_370=l9_361.x;
if (l9_370==1)
{
l9_369=fract(l9_369);
}
else
{
if (l9_370==2)
{
float l9_371=fract(l9_369);
float l9_372=l9_369-l9_371;
float l9_373=step(0.25,fract(l9_372*0.5));
l9_369=mix(l9_371,1.0-l9_371,fast::clamp(l9_373,0.0,1.0));
}
}
l9_358.x=l9_369;
float l9_374=l9_358.y;
int l9_375=l9_361.y;
if (l9_375==1)
{
l9_374=fract(l9_374);
}
else
{
if (l9_375==2)
{
float l9_376=fract(l9_374);
float l9_377=l9_374-l9_376;
float l9_378=step(0.25,fract(l9_377*0.5));
l9_374=mix(l9_376,1.0-l9_376,fast::clamp(l9_378,0.0,1.0));
}
}
l9_358.y=l9_374;
if (l9_362)
{
bool l9_379=l9_364;
bool l9_380;
if (l9_379)
{
l9_380=l9_361.x==3;
}
else
{
l9_380=l9_379;
}
float l9_381=l9_358.x;
float l9_382=l9_363.x;
float l9_383=l9_363.z;
bool l9_384=l9_380;
float l9_385=l9_368;
float l9_386=fast::clamp(l9_381,l9_382,l9_383);
float l9_387=step(abs(l9_381-l9_386),9.9999997e-06);
l9_385*=(l9_387+((1.0-float(l9_384))*(1.0-l9_387)));
l9_381=l9_386;
l9_358.x=l9_381;
l9_368=l9_385;
bool l9_388=l9_364;
bool l9_389;
if (l9_388)
{
l9_389=l9_361.y==3;
}
else
{
l9_389=l9_388;
}
float l9_390=l9_358.y;
float l9_391=l9_363.y;
float l9_392=l9_363.w;
bool l9_393=l9_389;
float l9_394=l9_368;
float l9_395=fast::clamp(l9_390,l9_391,l9_392);
float l9_396=step(abs(l9_390-l9_395),9.9999997e-06);
l9_394*=(l9_396+((1.0-float(l9_393))*(1.0-l9_396)));
l9_390=l9_395;
l9_358.y=l9_390;
l9_368=l9_394;
}
float2 l9_397=l9_358;
bool l9_398=l9_359;
float3x3 l9_399=l9_360;
if (l9_398)
{
l9_397=float2((l9_399*float3(l9_397,1.0)).xy);
}
float2 l9_400=l9_397;
l9_358=l9_400;
float l9_401=l9_358.x;
int l9_402=l9_361.x;
bool l9_403=l9_367;
float l9_404=l9_368;
if ((l9_402==0)||(l9_402==3))
{
float l9_405=l9_401;
float l9_406=0.0;
float l9_407=1.0;
bool l9_408=l9_403;
float l9_409=l9_404;
float l9_410=fast::clamp(l9_405,l9_406,l9_407);
float l9_411=step(abs(l9_405-l9_410),9.9999997e-06);
l9_409*=(l9_411+((1.0-float(l9_408))*(1.0-l9_411)));
l9_405=l9_410;
l9_401=l9_405;
l9_404=l9_409;
}
l9_358.x=l9_401;
l9_368=l9_404;
float l9_412=l9_358.y;
int l9_413=l9_361.y;
bool l9_414=l9_367;
float l9_415=l9_368;
if ((l9_413==0)||(l9_413==3))
{
float l9_416=l9_412;
float l9_417=0.0;
float l9_418=1.0;
bool l9_419=l9_414;
float l9_420=l9_415;
float l9_421=fast::clamp(l9_416,l9_417,l9_418);
float l9_422=step(abs(l9_416-l9_421),9.9999997e-06);
l9_420*=(l9_422+((1.0-float(l9_419))*(1.0-l9_422)));
l9_416=l9_421;
l9_412=l9_416;
l9_415=l9_420;
}
l9_358.y=l9_412;
l9_368=l9_415;
float2 l9_423=l9_358;
int l9_424=l9_356;
int l9_425=l9_357;
float l9_426=l9_366;
float2 l9_427=l9_423;
int l9_428=l9_424;
int l9_429=l9_425;
float3 l9_430=float3(0.0);
if (l9_428==0)
{
l9_430=float3(l9_427,0.0);
}
else
{
if (l9_428==1)
{
l9_430=float3(l9_427.x,(l9_427.y*0.5)+(0.5-(float(l9_429)*0.5)),0.0);
}
else
{
l9_430=float3(l9_427,float(l9_429));
}
}
float3 l9_431=l9_430;
float3 l9_432=l9_431;
float4 l9_433=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_432.xy,bias(l9_426));
float4 l9_434=l9_433;
if (l9_364)
{
l9_434=mix(l9_365,l9_434,float4(l9_368));
}
float4 l9_435=l9_434;
l9_349=l9_435;
l9_238=l9_349;
l9_242=l9_238;
}
l9_235=l9_242;
float l9_436=0.0;
float l9_437=0.0;
float l9_438=0.0;
float4 l9_439=l9_235;
float l9_440=l9_439.x;
float l9_441=l9_439.y;
float l9_442=l9_439.z;
l9_436=l9_440;
l9_437=l9_441;
l9_438=l9_442;
float l9_443=0.0;
l9_443=l9_233*l9_436;
float l9_444=0.0;
float l9_445=float((*sc_set0.UserUniforms).green_channel!=0);
l9_444=l9_445;
float l9_446=0.0;
l9_446=l9_444*l9_437;
float l9_447=0.0;
float l9_448=float((*sc_set0.UserUniforms).blue_channel!=0);
l9_447=l9_448;
float l9_449=0.0;
l9_449=l9_438*l9_447;
float l9_450=0.0;
float l9_451=0.0;
float l9_452=(*sc_set0.UserUniforms).Port_Value1_N036;
float l9_453=0.0;
ssGlobals l9_454=l9_223;
float l9_455=0.0;
float l9_456=float((*sc_set0.UserUniforms).alpha_channel!=0);
l9_455=l9_456;
float l9_457=0.0;
l9_457=float(l9_455==(*sc_set0.UserUniforms).Port_Input1_N035);
l9_451=l9_457;
float l9_458;
if ((l9_451*1.0)!=0.0)
{
l9_458=l9_452;
}
else
{
float4 l9_459=float4(0.0);
float l9_460=0.0;
float4 l9_461=float4(0.0);
float4 l9_462=float4(0.0);
ssGlobals l9_463=l9_454;
float l9_464=0.0;
float l9_465=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_464=l9_465;
l9_460=l9_464;
float4 l9_466;
if ((l9_460*1.0)!=0.0)
{
float2 l9_467=float2(0.0);
l9_467=l9_463.Surface_UVCoord0;
float2 l9_468=float2(0.0);
l9_468=l9_467*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_469=float4(0.0);
int l9_470;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_471=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_471=0;
}
else
{
l9_471=in.varStereoViewID;
}
int l9_472=l9_471;
l9_470=1-l9_472;
}
else
{
int l9_473=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_473=0;
}
else
{
l9_473=in.varStereoViewID;
}
int l9_474=l9_473;
l9_470=l9_474;
}
int l9_475=l9_470;
int l9_476=baseTexLayout_tmp;
int l9_477=l9_475;
float2 l9_478=l9_468;
bool l9_479=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_480=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_481=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_482=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_483=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_484=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_485=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_486=0.0;
bool l9_487=l9_484&&(!l9_482);
float l9_488=1.0;
float l9_489=l9_478.x;
int l9_490=l9_481.x;
if (l9_490==1)
{
l9_489=fract(l9_489);
}
else
{
if (l9_490==2)
{
float l9_491=fract(l9_489);
float l9_492=l9_489-l9_491;
float l9_493=step(0.25,fract(l9_492*0.5));
l9_489=mix(l9_491,1.0-l9_491,fast::clamp(l9_493,0.0,1.0));
}
}
l9_478.x=l9_489;
float l9_494=l9_478.y;
int l9_495=l9_481.y;
if (l9_495==1)
{
l9_494=fract(l9_494);
}
else
{
if (l9_495==2)
{
float l9_496=fract(l9_494);
float l9_497=l9_494-l9_496;
float l9_498=step(0.25,fract(l9_497*0.5));
l9_494=mix(l9_496,1.0-l9_496,fast::clamp(l9_498,0.0,1.0));
}
}
l9_478.y=l9_494;
if (l9_482)
{
bool l9_499=l9_484;
bool l9_500;
if (l9_499)
{
l9_500=l9_481.x==3;
}
else
{
l9_500=l9_499;
}
float l9_501=l9_478.x;
float l9_502=l9_483.x;
float l9_503=l9_483.z;
bool l9_504=l9_500;
float l9_505=l9_488;
float l9_506=fast::clamp(l9_501,l9_502,l9_503);
float l9_507=step(abs(l9_501-l9_506),9.9999997e-06);
l9_505*=(l9_507+((1.0-float(l9_504))*(1.0-l9_507)));
l9_501=l9_506;
l9_478.x=l9_501;
l9_488=l9_505;
bool l9_508=l9_484;
bool l9_509;
if (l9_508)
{
l9_509=l9_481.y==3;
}
else
{
l9_509=l9_508;
}
float l9_510=l9_478.y;
float l9_511=l9_483.y;
float l9_512=l9_483.w;
bool l9_513=l9_509;
float l9_514=l9_488;
float l9_515=fast::clamp(l9_510,l9_511,l9_512);
float l9_516=step(abs(l9_510-l9_515),9.9999997e-06);
l9_514*=(l9_516+((1.0-float(l9_513))*(1.0-l9_516)));
l9_510=l9_515;
l9_478.y=l9_510;
l9_488=l9_514;
}
float2 l9_517=l9_478;
bool l9_518=l9_479;
float3x3 l9_519=l9_480;
if (l9_518)
{
l9_517=float2((l9_519*float3(l9_517,1.0)).xy);
}
float2 l9_520=l9_517;
l9_478=l9_520;
float l9_521=l9_478.x;
int l9_522=l9_481.x;
bool l9_523=l9_487;
float l9_524=l9_488;
if ((l9_522==0)||(l9_522==3))
{
float l9_525=l9_521;
float l9_526=0.0;
float l9_527=1.0;
bool l9_528=l9_523;
float l9_529=l9_524;
float l9_530=fast::clamp(l9_525,l9_526,l9_527);
float l9_531=step(abs(l9_525-l9_530),9.9999997e-06);
l9_529*=(l9_531+((1.0-float(l9_528))*(1.0-l9_531)));
l9_525=l9_530;
l9_521=l9_525;
l9_524=l9_529;
}
l9_478.x=l9_521;
l9_488=l9_524;
float l9_532=l9_478.y;
int l9_533=l9_481.y;
bool l9_534=l9_487;
float l9_535=l9_488;
if ((l9_533==0)||(l9_533==3))
{
float l9_536=l9_532;
float l9_537=0.0;
float l9_538=1.0;
bool l9_539=l9_534;
float l9_540=l9_535;
float l9_541=fast::clamp(l9_536,l9_537,l9_538);
float l9_542=step(abs(l9_536-l9_541),9.9999997e-06);
l9_540*=(l9_542+((1.0-float(l9_539))*(1.0-l9_542)));
l9_536=l9_541;
l9_532=l9_536;
l9_535=l9_540;
}
l9_478.y=l9_532;
l9_488=l9_535;
float2 l9_543=l9_478;
int l9_544=l9_476;
int l9_545=l9_477;
float l9_546=l9_486;
float2 l9_547=l9_543;
int l9_548=l9_544;
int l9_549=l9_545;
float3 l9_550=float3(0.0);
if (l9_548==0)
{
l9_550=float3(l9_547,0.0);
}
else
{
if (l9_548==1)
{
l9_550=float3(l9_547.x,(l9_547.y*0.5)+(0.5-(float(l9_549)*0.5)),0.0);
}
else
{
l9_550=float3(l9_547,float(l9_549));
}
}
float3 l9_551=l9_550;
float3 l9_552=l9_551;
float4 l9_553=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_552.xy,bias(l9_546));
float4 l9_554=l9_553;
if (l9_484)
{
l9_554=mix(l9_485,l9_554,float4(l9_488));
}
float4 l9_555=l9_554;
l9_469=l9_555;
float4 l9_556=float4(0.0);
float4 l9_557=l9_469;
float4 l9_558=float4(0.0);
N16_Value1=l9_557;
float3 l9_559=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_559.x,l9_559.y,l9_559.z,N16_Result.w);
N16_Result.w=1.0;
l9_558=N16_Result;
l9_556=l9_558;
float4 l9_560=float4(0.0);
float3 l9_561=l9_556.xyz;
float l9_562=1.8;
float l9_563=1.4;
float l9_564=0.5;
float l9_565=1.5;
float3 l9_566=(l9_561*((l9_561*l9_562)+float3(l9_563)))/((l9_561*((l9_561*l9_562)+float3(l9_564)))+float3(l9_565));
l9_560=float4(l9_566,l9_556.w);
float4 l9_567=float4(0.0);
float4 l9_568=l9_560;
float4 l9_569;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_569=float4(pow(l9_568.x,0.45454544),pow(l9_568.y,0.45454544),pow(l9_568.z,0.45454544),pow(l9_568.w,0.45454544));
}
else
{
l9_569=sqrt(l9_568);
}
float4 l9_570=l9_569;
l9_567=l9_570;
l9_461=l9_567;
l9_466=l9_461;
}
else
{
float2 l9_571=float2(0.0);
l9_571=l9_463.Surface_UVCoord0;
float2 l9_572=float2(0.0);
l9_572=l9_571*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_573=float4(0.0);
int l9_574;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_575=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_575=0;
}
else
{
l9_575=in.varStereoViewID;
}
int l9_576=l9_575;
l9_574=1-l9_576;
}
else
{
int l9_577=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_577=0;
}
else
{
l9_577=in.varStereoViewID;
}
int l9_578=l9_577;
l9_574=l9_578;
}
int l9_579=l9_574;
int l9_580=baseTexLayout_tmp;
int l9_581=l9_579;
float2 l9_582=l9_572;
bool l9_583=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_584=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_585=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_586=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_587=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_588=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_589=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_590=0.0;
bool l9_591=l9_588&&(!l9_586);
float l9_592=1.0;
float l9_593=l9_582.x;
int l9_594=l9_585.x;
if (l9_594==1)
{
l9_593=fract(l9_593);
}
else
{
if (l9_594==2)
{
float l9_595=fract(l9_593);
float l9_596=l9_593-l9_595;
float l9_597=step(0.25,fract(l9_596*0.5));
l9_593=mix(l9_595,1.0-l9_595,fast::clamp(l9_597,0.0,1.0));
}
}
l9_582.x=l9_593;
float l9_598=l9_582.y;
int l9_599=l9_585.y;
if (l9_599==1)
{
l9_598=fract(l9_598);
}
else
{
if (l9_599==2)
{
float l9_600=fract(l9_598);
float l9_601=l9_598-l9_600;
float l9_602=step(0.25,fract(l9_601*0.5));
l9_598=mix(l9_600,1.0-l9_600,fast::clamp(l9_602,0.0,1.0));
}
}
l9_582.y=l9_598;
if (l9_586)
{
bool l9_603=l9_588;
bool l9_604;
if (l9_603)
{
l9_604=l9_585.x==3;
}
else
{
l9_604=l9_603;
}
float l9_605=l9_582.x;
float l9_606=l9_587.x;
float l9_607=l9_587.z;
bool l9_608=l9_604;
float l9_609=l9_592;
float l9_610=fast::clamp(l9_605,l9_606,l9_607);
float l9_611=step(abs(l9_605-l9_610),9.9999997e-06);
l9_609*=(l9_611+((1.0-float(l9_608))*(1.0-l9_611)));
l9_605=l9_610;
l9_582.x=l9_605;
l9_592=l9_609;
bool l9_612=l9_588;
bool l9_613;
if (l9_612)
{
l9_613=l9_585.y==3;
}
else
{
l9_613=l9_612;
}
float l9_614=l9_582.y;
float l9_615=l9_587.y;
float l9_616=l9_587.w;
bool l9_617=l9_613;
float l9_618=l9_592;
float l9_619=fast::clamp(l9_614,l9_615,l9_616);
float l9_620=step(abs(l9_614-l9_619),9.9999997e-06);
l9_618*=(l9_620+((1.0-float(l9_617))*(1.0-l9_620)));
l9_614=l9_619;
l9_582.y=l9_614;
l9_592=l9_618;
}
float2 l9_621=l9_582;
bool l9_622=l9_583;
float3x3 l9_623=l9_584;
if (l9_622)
{
l9_621=float2((l9_623*float3(l9_621,1.0)).xy);
}
float2 l9_624=l9_621;
l9_582=l9_624;
float l9_625=l9_582.x;
int l9_626=l9_585.x;
bool l9_627=l9_591;
float l9_628=l9_592;
if ((l9_626==0)||(l9_626==3))
{
float l9_629=l9_625;
float l9_630=0.0;
float l9_631=1.0;
bool l9_632=l9_627;
float l9_633=l9_628;
float l9_634=fast::clamp(l9_629,l9_630,l9_631);
float l9_635=step(abs(l9_629-l9_634),9.9999997e-06);
l9_633*=(l9_635+((1.0-float(l9_632))*(1.0-l9_635)));
l9_629=l9_634;
l9_625=l9_629;
l9_628=l9_633;
}
l9_582.x=l9_625;
l9_592=l9_628;
float l9_636=l9_582.y;
int l9_637=l9_585.y;
bool l9_638=l9_591;
float l9_639=l9_592;
if ((l9_637==0)||(l9_637==3))
{
float l9_640=l9_636;
float l9_641=0.0;
float l9_642=1.0;
bool l9_643=l9_638;
float l9_644=l9_639;
float l9_645=fast::clamp(l9_640,l9_641,l9_642);
float l9_646=step(abs(l9_640-l9_645),9.9999997e-06);
l9_644*=(l9_646+((1.0-float(l9_643))*(1.0-l9_646)));
l9_640=l9_645;
l9_636=l9_640;
l9_639=l9_644;
}
l9_582.y=l9_636;
l9_592=l9_639;
float2 l9_647=l9_582;
int l9_648=l9_580;
int l9_649=l9_581;
float l9_650=l9_590;
float2 l9_651=l9_647;
int l9_652=l9_648;
int l9_653=l9_649;
float3 l9_654=float3(0.0);
if (l9_652==0)
{
l9_654=float3(l9_651,0.0);
}
else
{
if (l9_652==1)
{
l9_654=float3(l9_651.x,(l9_651.y*0.5)+(0.5-(float(l9_653)*0.5)),0.0);
}
else
{
l9_654=float3(l9_651,float(l9_653));
}
}
float3 l9_655=l9_654;
float3 l9_656=l9_655;
float4 l9_657=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_656.xy,bias(l9_650));
float4 l9_658=l9_657;
if (l9_588)
{
l9_658=mix(l9_589,l9_658,float4(l9_592));
}
float4 l9_659=l9_658;
l9_573=l9_659;
l9_462=l9_573;
l9_466=l9_462;
}
l9_459=l9_466;
float l9_660=0.0;
float4 l9_661=l9_459;
float l9_662=l9_661.w;
l9_660=l9_662;
l9_453=l9_660;
l9_458=l9_453;
}
l9_450=l9_458;
float4 l9_663=float4(0.0);
l9_663.x=l9_443;
l9_663.y=l9_446;
l9_663.z=l9_449;
l9_663.w=l9_450;
l9_221=l9_663;
l9_232=l9_221;
}
else
{
float4 l9_664=float4(0.0);
float l9_665=0.0;
float4 l9_666=float4(0.0);
float4 l9_667=(*sc_set0.UserUniforms).Port_Default_N050;
ssGlobals l9_668=l9_223;
float l9_669=0.0;
float l9_670=float((*sc_set0.UserUniforms).red_channel!=0);
l9_669=l9_670;
float l9_671=0.0;
float l9_672=float((*sc_set0.UserUniforms).green_channel!=0);
l9_671=l9_672;
float l9_673=0.0;
float l9_674=float((*sc_set0.UserUniforms).blue_channel!=0);
l9_673=l9_674;
float l9_675=0.0;
l9_675=(l9_669+l9_671)+l9_673;
float l9_676=0.0;
l9_676=float(l9_675==(*sc_set0.UserUniforms).Port_Input1_N046);
l9_665=l9_676;
float4 l9_677;
if ((l9_665*1.0)!=0.0)
{
float4 l9_678=float4(0.0);
float l9_679=0.0;
float4 l9_680=float4(0.0);
float4 l9_681=float4(0.0);
ssGlobals l9_682=l9_668;
float l9_683=0.0;
float l9_684=float((*sc_set0.UserUniforms).red_channel!=0);
l9_683=l9_684;
float l9_685=0.0;
l9_685=float(l9_683==(*sc_set0.UserUniforms).Port_Input1_N051);
l9_679=l9_685;
float4 l9_686;
if ((l9_679*1.0)!=0.0)
{
float4 l9_687=float4(0.0);
float l9_688=0.0;
float4 l9_689=float4(0.0);
float4 l9_690=float4(0.0);
ssGlobals l9_691=l9_682;
float l9_692=0.0;
float l9_693=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_692=l9_693;
l9_688=l9_692;
float4 l9_694;
if ((l9_688*1.0)!=0.0)
{
float2 l9_695=float2(0.0);
l9_695=l9_691.Surface_UVCoord0;
float2 l9_696=float2(0.0);
l9_696=l9_695*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_697=float4(0.0);
int l9_698;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_699=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_699=0;
}
else
{
l9_699=in.varStereoViewID;
}
int l9_700=l9_699;
l9_698=1-l9_700;
}
else
{
int l9_701=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_701=0;
}
else
{
l9_701=in.varStereoViewID;
}
int l9_702=l9_701;
l9_698=l9_702;
}
int l9_703=l9_698;
int l9_704=baseTexLayout_tmp;
int l9_705=l9_703;
float2 l9_706=l9_696;
bool l9_707=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_708=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_709=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_710=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_711=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_712=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_713=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_714=0.0;
bool l9_715=l9_712&&(!l9_710);
float l9_716=1.0;
float l9_717=l9_706.x;
int l9_718=l9_709.x;
if (l9_718==1)
{
l9_717=fract(l9_717);
}
else
{
if (l9_718==2)
{
float l9_719=fract(l9_717);
float l9_720=l9_717-l9_719;
float l9_721=step(0.25,fract(l9_720*0.5));
l9_717=mix(l9_719,1.0-l9_719,fast::clamp(l9_721,0.0,1.0));
}
}
l9_706.x=l9_717;
float l9_722=l9_706.y;
int l9_723=l9_709.y;
if (l9_723==1)
{
l9_722=fract(l9_722);
}
else
{
if (l9_723==2)
{
float l9_724=fract(l9_722);
float l9_725=l9_722-l9_724;
float l9_726=step(0.25,fract(l9_725*0.5));
l9_722=mix(l9_724,1.0-l9_724,fast::clamp(l9_726,0.0,1.0));
}
}
l9_706.y=l9_722;
if (l9_710)
{
bool l9_727=l9_712;
bool l9_728;
if (l9_727)
{
l9_728=l9_709.x==3;
}
else
{
l9_728=l9_727;
}
float l9_729=l9_706.x;
float l9_730=l9_711.x;
float l9_731=l9_711.z;
bool l9_732=l9_728;
float l9_733=l9_716;
float l9_734=fast::clamp(l9_729,l9_730,l9_731);
float l9_735=step(abs(l9_729-l9_734),9.9999997e-06);
l9_733*=(l9_735+((1.0-float(l9_732))*(1.0-l9_735)));
l9_729=l9_734;
l9_706.x=l9_729;
l9_716=l9_733;
bool l9_736=l9_712;
bool l9_737;
if (l9_736)
{
l9_737=l9_709.y==3;
}
else
{
l9_737=l9_736;
}
float l9_738=l9_706.y;
float l9_739=l9_711.y;
float l9_740=l9_711.w;
bool l9_741=l9_737;
float l9_742=l9_716;
float l9_743=fast::clamp(l9_738,l9_739,l9_740);
float l9_744=step(abs(l9_738-l9_743),9.9999997e-06);
l9_742*=(l9_744+((1.0-float(l9_741))*(1.0-l9_744)));
l9_738=l9_743;
l9_706.y=l9_738;
l9_716=l9_742;
}
float2 l9_745=l9_706;
bool l9_746=l9_707;
float3x3 l9_747=l9_708;
if (l9_746)
{
l9_745=float2((l9_747*float3(l9_745,1.0)).xy);
}
float2 l9_748=l9_745;
l9_706=l9_748;
float l9_749=l9_706.x;
int l9_750=l9_709.x;
bool l9_751=l9_715;
float l9_752=l9_716;
if ((l9_750==0)||(l9_750==3))
{
float l9_753=l9_749;
float l9_754=0.0;
float l9_755=1.0;
bool l9_756=l9_751;
float l9_757=l9_752;
float l9_758=fast::clamp(l9_753,l9_754,l9_755);
float l9_759=step(abs(l9_753-l9_758),9.9999997e-06);
l9_757*=(l9_759+((1.0-float(l9_756))*(1.0-l9_759)));
l9_753=l9_758;
l9_749=l9_753;
l9_752=l9_757;
}
l9_706.x=l9_749;
l9_716=l9_752;
float l9_760=l9_706.y;
int l9_761=l9_709.y;
bool l9_762=l9_715;
float l9_763=l9_716;
if ((l9_761==0)||(l9_761==3))
{
float l9_764=l9_760;
float l9_765=0.0;
float l9_766=1.0;
bool l9_767=l9_762;
float l9_768=l9_763;
float l9_769=fast::clamp(l9_764,l9_765,l9_766);
float l9_770=step(abs(l9_764-l9_769),9.9999997e-06);
l9_768*=(l9_770+((1.0-float(l9_767))*(1.0-l9_770)));
l9_764=l9_769;
l9_760=l9_764;
l9_763=l9_768;
}
l9_706.y=l9_760;
l9_716=l9_763;
float2 l9_771=l9_706;
int l9_772=l9_704;
int l9_773=l9_705;
float l9_774=l9_714;
float2 l9_775=l9_771;
int l9_776=l9_772;
int l9_777=l9_773;
float3 l9_778=float3(0.0);
if (l9_776==0)
{
l9_778=float3(l9_775,0.0);
}
else
{
if (l9_776==1)
{
l9_778=float3(l9_775.x,(l9_775.y*0.5)+(0.5-(float(l9_777)*0.5)),0.0);
}
else
{
l9_778=float3(l9_775,float(l9_777));
}
}
float3 l9_779=l9_778;
float3 l9_780=l9_779;
float4 l9_781=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_780.xy,bias(l9_774));
float4 l9_782=l9_781;
if (l9_712)
{
l9_782=mix(l9_713,l9_782,float4(l9_716));
}
float4 l9_783=l9_782;
l9_697=l9_783;
float4 l9_784=float4(0.0);
float4 l9_785=l9_697;
float4 l9_786=float4(0.0);
N16_Value1=l9_785;
float3 l9_787=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_787.x,l9_787.y,l9_787.z,N16_Result.w);
N16_Result.w=1.0;
l9_786=N16_Result;
l9_784=l9_786;
float4 l9_788=float4(0.0);
float3 l9_789=l9_784.xyz;
float l9_790=1.8;
float l9_791=1.4;
float l9_792=0.5;
float l9_793=1.5;
float3 l9_794=(l9_789*((l9_789*l9_790)+float3(l9_791)))/((l9_789*((l9_789*l9_790)+float3(l9_792)))+float3(l9_793));
l9_788=float4(l9_794,l9_784.w);
float4 l9_795=float4(0.0);
float4 l9_796=l9_788;
float4 l9_797;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_797=float4(pow(l9_796.x,0.45454544),pow(l9_796.y,0.45454544),pow(l9_796.z,0.45454544),pow(l9_796.w,0.45454544));
}
else
{
l9_797=sqrt(l9_796);
}
float4 l9_798=l9_797;
l9_795=l9_798;
l9_689=l9_795;
l9_694=l9_689;
}
else
{
float2 l9_799=float2(0.0);
l9_799=l9_691.Surface_UVCoord0;
float2 l9_800=float2(0.0);
l9_800=l9_799*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_801=float4(0.0);
int l9_802;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_803=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_803=0;
}
else
{
l9_803=in.varStereoViewID;
}
int l9_804=l9_803;
l9_802=1-l9_804;
}
else
{
int l9_805=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_805=0;
}
else
{
l9_805=in.varStereoViewID;
}
int l9_806=l9_805;
l9_802=l9_806;
}
int l9_807=l9_802;
int l9_808=baseTexLayout_tmp;
int l9_809=l9_807;
float2 l9_810=l9_800;
bool l9_811=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_812=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_813=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_814=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_815=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_816=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_817=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_818=0.0;
bool l9_819=l9_816&&(!l9_814);
float l9_820=1.0;
float l9_821=l9_810.x;
int l9_822=l9_813.x;
if (l9_822==1)
{
l9_821=fract(l9_821);
}
else
{
if (l9_822==2)
{
float l9_823=fract(l9_821);
float l9_824=l9_821-l9_823;
float l9_825=step(0.25,fract(l9_824*0.5));
l9_821=mix(l9_823,1.0-l9_823,fast::clamp(l9_825,0.0,1.0));
}
}
l9_810.x=l9_821;
float l9_826=l9_810.y;
int l9_827=l9_813.y;
if (l9_827==1)
{
l9_826=fract(l9_826);
}
else
{
if (l9_827==2)
{
float l9_828=fract(l9_826);
float l9_829=l9_826-l9_828;
float l9_830=step(0.25,fract(l9_829*0.5));
l9_826=mix(l9_828,1.0-l9_828,fast::clamp(l9_830,0.0,1.0));
}
}
l9_810.y=l9_826;
if (l9_814)
{
bool l9_831=l9_816;
bool l9_832;
if (l9_831)
{
l9_832=l9_813.x==3;
}
else
{
l9_832=l9_831;
}
float l9_833=l9_810.x;
float l9_834=l9_815.x;
float l9_835=l9_815.z;
bool l9_836=l9_832;
float l9_837=l9_820;
float l9_838=fast::clamp(l9_833,l9_834,l9_835);
float l9_839=step(abs(l9_833-l9_838),9.9999997e-06);
l9_837*=(l9_839+((1.0-float(l9_836))*(1.0-l9_839)));
l9_833=l9_838;
l9_810.x=l9_833;
l9_820=l9_837;
bool l9_840=l9_816;
bool l9_841;
if (l9_840)
{
l9_841=l9_813.y==3;
}
else
{
l9_841=l9_840;
}
float l9_842=l9_810.y;
float l9_843=l9_815.y;
float l9_844=l9_815.w;
bool l9_845=l9_841;
float l9_846=l9_820;
float l9_847=fast::clamp(l9_842,l9_843,l9_844);
float l9_848=step(abs(l9_842-l9_847),9.9999997e-06);
l9_846*=(l9_848+((1.0-float(l9_845))*(1.0-l9_848)));
l9_842=l9_847;
l9_810.y=l9_842;
l9_820=l9_846;
}
float2 l9_849=l9_810;
bool l9_850=l9_811;
float3x3 l9_851=l9_812;
if (l9_850)
{
l9_849=float2((l9_851*float3(l9_849,1.0)).xy);
}
float2 l9_852=l9_849;
l9_810=l9_852;
float l9_853=l9_810.x;
int l9_854=l9_813.x;
bool l9_855=l9_819;
float l9_856=l9_820;
if ((l9_854==0)||(l9_854==3))
{
float l9_857=l9_853;
float l9_858=0.0;
float l9_859=1.0;
bool l9_860=l9_855;
float l9_861=l9_856;
float l9_862=fast::clamp(l9_857,l9_858,l9_859);
float l9_863=step(abs(l9_857-l9_862),9.9999997e-06);
l9_861*=(l9_863+((1.0-float(l9_860))*(1.0-l9_863)));
l9_857=l9_862;
l9_853=l9_857;
l9_856=l9_861;
}
l9_810.x=l9_853;
l9_820=l9_856;
float l9_864=l9_810.y;
int l9_865=l9_813.y;
bool l9_866=l9_819;
float l9_867=l9_820;
if ((l9_865==0)||(l9_865==3))
{
float l9_868=l9_864;
float l9_869=0.0;
float l9_870=1.0;
bool l9_871=l9_866;
float l9_872=l9_867;
float l9_873=fast::clamp(l9_868,l9_869,l9_870);
float l9_874=step(abs(l9_868-l9_873),9.9999997e-06);
l9_872*=(l9_874+((1.0-float(l9_871))*(1.0-l9_874)));
l9_868=l9_873;
l9_864=l9_868;
l9_867=l9_872;
}
l9_810.y=l9_864;
l9_820=l9_867;
float2 l9_875=l9_810;
int l9_876=l9_808;
int l9_877=l9_809;
float l9_878=l9_818;
float2 l9_879=l9_875;
int l9_880=l9_876;
int l9_881=l9_877;
float3 l9_882=float3(0.0);
if (l9_880==0)
{
l9_882=float3(l9_879,0.0);
}
else
{
if (l9_880==1)
{
l9_882=float3(l9_879.x,(l9_879.y*0.5)+(0.5-(float(l9_881)*0.5)),0.0);
}
else
{
l9_882=float3(l9_879,float(l9_881));
}
}
float3 l9_883=l9_882;
float3 l9_884=l9_883;
float4 l9_885=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_884.xy,bias(l9_878));
float4 l9_886=l9_885;
if (l9_816)
{
l9_886=mix(l9_817,l9_886,float4(l9_820));
}
float4 l9_887=l9_886;
l9_801=l9_887;
l9_690=l9_801;
l9_694=l9_690;
}
l9_687=l9_694;
float l9_888=0.0;
float4 l9_889=l9_687;
float l9_890=l9_889.x;
l9_888=l9_890;
float l9_891=0.0;
float l9_892=0.0;
float l9_893=(*sc_set0.UserUniforms).Port_Value1_N043;
float l9_894=0.0;
ssGlobals l9_895=l9_682;
float l9_896=0.0;
float l9_897=float((*sc_set0.UserUniforms).alpha_channel!=0);
l9_896=l9_897;
float l9_898=0.0;
l9_898=float(l9_896==(*sc_set0.UserUniforms).Port_Input1_N034);
l9_892=l9_898;
float l9_899;
if ((l9_892*1.0)!=0.0)
{
l9_899=l9_893;
}
else
{
float4 l9_900=float4(0.0);
float l9_901=0.0;
float4 l9_902=float4(0.0);
float4 l9_903=float4(0.0);
ssGlobals l9_904=l9_895;
float l9_905=0.0;
float l9_906=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_905=l9_906;
l9_901=l9_905;
float4 l9_907;
if ((l9_901*1.0)!=0.0)
{
float2 l9_908=float2(0.0);
l9_908=l9_904.Surface_UVCoord0;
float2 l9_909=float2(0.0);
l9_909=l9_908*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_910=float4(0.0);
int l9_911;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_912=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_912=0;
}
else
{
l9_912=in.varStereoViewID;
}
int l9_913=l9_912;
l9_911=1-l9_913;
}
else
{
int l9_914=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_914=0;
}
else
{
l9_914=in.varStereoViewID;
}
int l9_915=l9_914;
l9_911=l9_915;
}
int l9_916=l9_911;
int l9_917=baseTexLayout_tmp;
int l9_918=l9_916;
float2 l9_919=l9_909;
bool l9_920=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_921=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_922=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_923=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_924=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_925=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_926=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_927=0.0;
bool l9_928=l9_925&&(!l9_923);
float l9_929=1.0;
float l9_930=l9_919.x;
int l9_931=l9_922.x;
if (l9_931==1)
{
l9_930=fract(l9_930);
}
else
{
if (l9_931==2)
{
float l9_932=fract(l9_930);
float l9_933=l9_930-l9_932;
float l9_934=step(0.25,fract(l9_933*0.5));
l9_930=mix(l9_932,1.0-l9_932,fast::clamp(l9_934,0.0,1.0));
}
}
l9_919.x=l9_930;
float l9_935=l9_919.y;
int l9_936=l9_922.y;
if (l9_936==1)
{
l9_935=fract(l9_935);
}
else
{
if (l9_936==2)
{
float l9_937=fract(l9_935);
float l9_938=l9_935-l9_937;
float l9_939=step(0.25,fract(l9_938*0.5));
l9_935=mix(l9_937,1.0-l9_937,fast::clamp(l9_939,0.0,1.0));
}
}
l9_919.y=l9_935;
if (l9_923)
{
bool l9_940=l9_925;
bool l9_941;
if (l9_940)
{
l9_941=l9_922.x==3;
}
else
{
l9_941=l9_940;
}
float l9_942=l9_919.x;
float l9_943=l9_924.x;
float l9_944=l9_924.z;
bool l9_945=l9_941;
float l9_946=l9_929;
float l9_947=fast::clamp(l9_942,l9_943,l9_944);
float l9_948=step(abs(l9_942-l9_947),9.9999997e-06);
l9_946*=(l9_948+((1.0-float(l9_945))*(1.0-l9_948)));
l9_942=l9_947;
l9_919.x=l9_942;
l9_929=l9_946;
bool l9_949=l9_925;
bool l9_950;
if (l9_949)
{
l9_950=l9_922.y==3;
}
else
{
l9_950=l9_949;
}
float l9_951=l9_919.y;
float l9_952=l9_924.y;
float l9_953=l9_924.w;
bool l9_954=l9_950;
float l9_955=l9_929;
float l9_956=fast::clamp(l9_951,l9_952,l9_953);
float l9_957=step(abs(l9_951-l9_956),9.9999997e-06);
l9_955*=(l9_957+((1.0-float(l9_954))*(1.0-l9_957)));
l9_951=l9_956;
l9_919.y=l9_951;
l9_929=l9_955;
}
float2 l9_958=l9_919;
bool l9_959=l9_920;
float3x3 l9_960=l9_921;
if (l9_959)
{
l9_958=float2((l9_960*float3(l9_958,1.0)).xy);
}
float2 l9_961=l9_958;
l9_919=l9_961;
float l9_962=l9_919.x;
int l9_963=l9_922.x;
bool l9_964=l9_928;
float l9_965=l9_929;
if ((l9_963==0)||(l9_963==3))
{
float l9_966=l9_962;
float l9_967=0.0;
float l9_968=1.0;
bool l9_969=l9_964;
float l9_970=l9_965;
float l9_971=fast::clamp(l9_966,l9_967,l9_968);
float l9_972=step(abs(l9_966-l9_971),9.9999997e-06);
l9_970*=(l9_972+((1.0-float(l9_969))*(1.0-l9_972)));
l9_966=l9_971;
l9_962=l9_966;
l9_965=l9_970;
}
l9_919.x=l9_962;
l9_929=l9_965;
float l9_973=l9_919.y;
int l9_974=l9_922.y;
bool l9_975=l9_928;
float l9_976=l9_929;
if ((l9_974==0)||(l9_974==3))
{
float l9_977=l9_973;
float l9_978=0.0;
float l9_979=1.0;
bool l9_980=l9_975;
float l9_981=l9_976;
float l9_982=fast::clamp(l9_977,l9_978,l9_979);
float l9_983=step(abs(l9_977-l9_982),9.9999997e-06);
l9_981*=(l9_983+((1.0-float(l9_980))*(1.0-l9_983)));
l9_977=l9_982;
l9_973=l9_977;
l9_976=l9_981;
}
l9_919.y=l9_973;
l9_929=l9_976;
float2 l9_984=l9_919;
int l9_985=l9_917;
int l9_986=l9_918;
float l9_987=l9_927;
float2 l9_988=l9_984;
int l9_989=l9_985;
int l9_990=l9_986;
float3 l9_991=float3(0.0);
if (l9_989==0)
{
l9_991=float3(l9_988,0.0);
}
else
{
if (l9_989==1)
{
l9_991=float3(l9_988.x,(l9_988.y*0.5)+(0.5-(float(l9_990)*0.5)),0.0);
}
else
{
l9_991=float3(l9_988,float(l9_990));
}
}
float3 l9_992=l9_991;
float3 l9_993=l9_992;
float4 l9_994=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_993.xy,bias(l9_987));
float4 l9_995=l9_994;
if (l9_925)
{
l9_995=mix(l9_926,l9_995,float4(l9_929));
}
float4 l9_996=l9_995;
l9_910=l9_996;
float4 l9_997=float4(0.0);
float4 l9_998=l9_910;
float4 l9_999=float4(0.0);
N16_Value1=l9_998;
float3 l9_1000=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_1000.x,l9_1000.y,l9_1000.z,N16_Result.w);
N16_Result.w=1.0;
l9_999=N16_Result;
l9_997=l9_999;
float4 l9_1001=float4(0.0);
float3 l9_1002=l9_997.xyz;
float l9_1003=1.8;
float l9_1004=1.4;
float l9_1005=0.5;
float l9_1006=1.5;
float3 l9_1007=(l9_1002*((l9_1002*l9_1003)+float3(l9_1004)))/((l9_1002*((l9_1002*l9_1003)+float3(l9_1005)))+float3(l9_1006));
l9_1001=float4(l9_1007,l9_997.w);
float4 l9_1008=float4(0.0);
float4 l9_1009=l9_1001;
float4 l9_1010;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_1010=float4(pow(l9_1009.x,0.45454544),pow(l9_1009.y,0.45454544),pow(l9_1009.z,0.45454544),pow(l9_1009.w,0.45454544));
}
else
{
l9_1010=sqrt(l9_1009);
}
float4 l9_1011=l9_1010;
l9_1008=l9_1011;
l9_902=l9_1008;
l9_907=l9_902;
}
else
{
float2 l9_1012=float2(0.0);
l9_1012=l9_904.Surface_UVCoord0;
float2 l9_1013=float2(0.0);
l9_1013=l9_1012*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1014=float4(0.0);
int l9_1015;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1016=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1016=0;
}
else
{
l9_1016=in.varStereoViewID;
}
int l9_1017=l9_1016;
l9_1015=1-l9_1017;
}
else
{
int l9_1018=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1018=0;
}
else
{
l9_1018=in.varStereoViewID;
}
int l9_1019=l9_1018;
l9_1015=l9_1019;
}
int l9_1020=l9_1015;
int l9_1021=baseTexLayout_tmp;
int l9_1022=l9_1020;
float2 l9_1023=l9_1013;
bool l9_1024=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1025=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1026=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1027=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1028=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1029=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1030=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1031=0.0;
bool l9_1032=l9_1029&&(!l9_1027);
float l9_1033=1.0;
float l9_1034=l9_1023.x;
int l9_1035=l9_1026.x;
if (l9_1035==1)
{
l9_1034=fract(l9_1034);
}
else
{
if (l9_1035==2)
{
float l9_1036=fract(l9_1034);
float l9_1037=l9_1034-l9_1036;
float l9_1038=step(0.25,fract(l9_1037*0.5));
l9_1034=mix(l9_1036,1.0-l9_1036,fast::clamp(l9_1038,0.0,1.0));
}
}
l9_1023.x=l9_1034;
float l9_1039=l9_1023.y;
int l9_1040=l9_1026.y;
if (l9_1040==1)
{
l9_1039=fract(l9_1039);
}
else
{
if (l9_1040==2)
{
float l9_1041=fract(l9_1039);
float l9_1042=l9_1039-l9_1041;
float l9_1043=step(0.25,fract(l9_1042*0.5));
l9_1039=mix(l9_1041,1.0-l9_1041,fast::clamp(l9_1043,0.0,1.0));
}
}
l9_1023.y=l9_1039;
if (l9_1027)
{
bool l9_1044=l9_1029;
bool l9_1045;
if (l9_1044)
{
l9_1045=l9_1026.x==3;
}
else
{
l9_1045=l9_1044;
}
float l9_1046=l9_1023.x;
float l9_1047=l9_1028.x;
float l9_1048=l9_1028.z;
bool l9_1049=l9_1045;
float l9_1050=l9_1033;
float l9_1051=fast::clamp(l9_1046,l9_1047,l9_1048);
float l9_1052=step(abs(l9_1046-l9_1051),9.9999997e-06);
l9_1050*=(l9_1052+((1.0-float(l9_1049))*(1.0-l9_1052)));
l9_1046=l9_1051;
l9_1023.x=l9_1046;
l9_1033=l9_1050;
bool l9_1053=l9_1029;
bool l9_1054;
if (l9_1053)
{
l9_1054=l9_1026.y==3;
}
else
{
l9_1054=l9_1053;
}
float l9_1055=l9_1023.y;
float l9_1056=l9_1028.y;
float l9_1057=l9_1028.w;
bool l9_1058=l9_1054;
float l9_1059=l9_1033;
float l9_1060=fast::clamp(l9_1055,l9_1056,l9_1057);
float l9_1061=step(abs(l9_1055-l9_1060),9.9999997e-06);
l9_1059*=(l9_1061+((1.0-float(l9_1058))*(1.0-l9_1061)));
l9_1055=l9_1060;
l9_1023.y=l9_1055;
l9_1033=l9_1059;
}
float2 l9_1062=l9_1023;
bool l9_1063=l9_1024;
float3x3 l9_1064=l9_1025;
if (l9_1063)
{
l9_1062=float2((l9_1064*float3(l9_1062,1.0)).xy);
}
float2 l9_1065=l9_1062;
l9_1023=l9_1065;
float l9_1066=l9_1023.x;
int l9_1067=l9_1026.x;
bool l9_1068=l9_1032;
float l9_1069=l9_1033;
if ((l9_1067==0)||(l9_1067==3))
{
float l9_1070=l9_1066;
float l9_1071=0.0;
float l9_1072=1.0;
bool l9_1073=l9_1068;
float l9_1074=l9_1069;
float l9_1075=fast::clamp(l9_1070,l9_1071,l9_1072);
float l9_1076=step(abs(l9_1070-l9_1075),9.9999997e-06);
l9_1074*=(l9_1076+((1.0-float(l9_1073))*(1.0-l9_1076)));
l9_1070=l9_1075;
l9_1066=l9_1070;
l9_1069=l9_1074;
}
l9_1023.x=l9_1066;
l9_1033=l9_1069;
float l9_1077=l9_1023.y;
int l9_1078=l9_1026.y;
bool l9_1079=l9_1032;
float l9_1080=l9_1033;
if ((l9_1078==0)||(l9_1078==3))
{
float l9_1081=l9_1077;
float l9_1082=0.0;
float l9_1083=1.0;
bool l9_1084=l9_1079;
float l9_1085=l9_1080;
float l9_1086=fast::clamp(l9_1081,l9_1082,l9_1083);
float l9_1087=step(abs(l9_1081-l9_1086),9.9999997e-06);
l9_1085*=(l9_1087+((1.0-float(l9_1084))*(1.0-l9_1087)));
l9_1081=l9_1086;
l9_1077=l9_1081;
l9_1080=l9_1085;
}
l9_1023.y=l9_1077;
l9_1033=l9_1080;
float2 l9_1088=l9_1023;
int l9_1089=l9_1021;
int l9_1090=l9_1022;
float l9_1091=l9_1031;
float2 l9_1092=l9_1088;
int l9_1093=l9_1089;
int l9_1094=l9_1090;
float3 l9_1095=float3(0.0);
if (l9_1093==0)
{
l9_1095=float3(l9_1092,0.0);
}
else
{
if (l9_1093==1)
{
l9_1095=float3(l9_1092.x,(l9_1092.y*0.5)+(0.5-(float(l9_1094)*0.5)),0.0);
}
else
{
l9_1095=float3(l9_1092,float(l9_1094));
}
}
float3 l9_1096=l9_1095;
float3 l9_1097=l9_1096;
float4 l9_1098=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1097.xy,bias(l9_1091));
float4 l9_1099=l9_1098;
if (l9_1029)
{
l9_1099=mix(l9_1030,l9_1099,float4(l9_1033));
}
float4 l9_1100=l9_1099;
l9_1014=l9_1100;
l9_903=l9_1014;
l9_907=l9_903;
}
l9_900=l9_907;
float l9_1101=0.0;
float4 l9_1102=l9_900;
float l9_1103=l9_1102.w;
l9_1101=l9_1103;
l9_894=l9_1101;
l9_899=l9_894;
}
l9_891=l9_899;
float4 l9_1104=float4(0.0);
l9_1104.x=l9_888;
l9_1104.y=l9_888;
l9_1104.z=l9_888;
l9_1104.w=l9_891;
l9_680=l9_1104;
l9_686=l9_680;
}
else
{
float4 l9_1105=float4(0.0);
float l9_1106=0.0;
float4 l9_1107=float4(0.0);
float4 l9_1108=float4(0.0);
ssGlobals l9_1109=l9_682;
float l9_1110=0.0;
float l9_1111=float((*sc_set0.UserUniforms).green_channel!=0);
l9_1110=l9_1111;
float l9_1112=0.0;
l9_1112=float(l9_1110==(*sc_set0.UserUniforms).Port_Input1_N052);
l9_1106=l9_1112;
float4 l9_1113;
if ((l9_1106*1.0)!=0.0)
{
float4 l9_1114=float4(0.0);
float l9_1115=0.0;
float4 l9_1116=float4(0.0);
float4 l9_1117=float4(0.0);
ssGlobals l9_1118=l9_1109;
float l9_1119=0.0;
float l9_1120=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_1119=l9_1120;
l9_1115=l9_1119;
float4 l9_1121;
if ((l9_1115*1.0)!=0.0)
{
float2 l9_1122=float2(0.0);
l9_1122=l9_1118.Surface_UVCoord0;
float2 l9_1123=float2(0.0);
l9_1123=l9_1122*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1124=float4(0.0);
int l9_1125;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1126=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1126=0;
}
else
{
l9_1126=in.varStereoViewID;
}
int l9_1127=l9_1126;
l9_1125=1-l9_1127;
}
else
{
int l9_1128=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1128=0;
}
else
{
l9_1128=in.varStereoViewID;
}
int l9_1129=l9_1128;
l9_1125=l9_1129;
}
int l9_1130=l9_1125;
int l9_1131=baseTexLayout_tmp;
int l9_1132=l9_1130;
float2 l9_1133=l9_1123;
bool l9_1134=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1135=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1136=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1137=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1138=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1139=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1140=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1141=0.0;
bool l9_1142=l9_1139&&(!l9_1137);
float l9_1143=1.0;
float l9_1144=l9_1133.x;
int l9_1145=l9_1136.x;
if (l9_1145==1)
{
l9_1144=fract(l9_1144);
}
else
{
if (l9_1145==2)
{
float l9_1146=fract(l9_1144);
float l9_1147=l9_1144-l9_1146;
float l9_1148=step(0.25,fract(l9_1147*0.5));
l9_1144=mix(l9_1146,1.0-l9_1146,fast::clamp(l9_1148,0.0,1.0));
}
}
l9_1133.x=l9_1144;
float l9_1149=l9_1133.y;
int l9_1150=l9_1136.y;
if (l9_1150==1)
{
l9_1149=fract(l9_1149);
}
else
{
if (l9_1150==2)
{
float l9_1151=fract(l9_1149);
float l9_1152=l9_1149-l9_1151;
float l9_1153=step(0.25,fract(l9_1152*0.5));
l9_1149=mix(l9_1151,1.0-l9_1151,fast::clamp(l9_1153,0.0,1.0));
}
}
l9_1133.y=l9_1149;
if (l9_1137)
{
bool l9_1154=l9_1139;
bool l9_1155;
if (l9_1154)
{
l9_1155=l9_1136.x==3;
}
else
{
l9_1155=l9_1154;
}
float l9_1156=l9_1133.x;
float l9_1157=l9_1138.x;
float l9_1158=l9_1138.z;
bool l9_1159=l9_1155;
float l9_1160=l9_1143;
float l9_1161=fast::clamp(l9_1156,l9_1157,l9_1158);
float l9_1162=step(abs(l9_1156-l9_1161),9.9999997e-06);
l9_1160*=(l9_1162+((1.0-float(l9_1159))*(1.0-l9_1162)));
l9_1156=l9_1161;
l9_1133.x=l9_1156;
l9_1143=l9_1160;
bool l9_1163=l9_1139;
bool l9_1164;
if (l9_1163)
{
l9_1164=l9_1136.y==3;
}
else
{
l9_1164=l9_1163;
}
float l9_1165=l9_1133.y;
float l9_1166=l9_1138.y;
float l9_1167=l9_1138.w;
bool l9_1168=l9_1164;
float l9_1169=l9_1143;
float l9_1170=fast::clamp(l9_1165,l9_1166,l9_1167);
float l9_1171=step(abs(l9_1165-l9_1170),9.9999997e-06);
l9_1169*=(l9_1171+((1.0-float(l9_1168))*(1.0-l9_1171)));
l9_1165=l9_1170;
l9_1133.y=l9_1165;
l9_1143=l9_1169;
}
float2 l9_1172=l9_1133;
bool l9_1173=l9_1134;
float3x3 l9_1174=l9_1135;
if (l9_1173)
{
l9_1172=float2((l9_1174*float3(l9_1172,1.0)).xy);
}
float2 l9_1175=l9_1172;
l9_1133=l9_1175;
float l9_1176=l9_1133.x;
int l9_1177=l9_1136.x;
bool l9_1178=l9_1142;
float l9_1179=l9_1143;
if ((l9_1177==0)||(l9_1177==3))
{
float l9_1180=l9_1176;
float l9_1181=0.0;
float l9_1182=1.0;
bool l9_1183=l9_1178;
float l9_1184=l9_1179;
float l9_1185=fast::clamp(l9_1180,l9_1181,l9_1182);
float l9_1186=step(abs(l9_1180-l9_1185),9.9999997e-06);
l9_1184*=(l9_1186+((1.0-float(l9_1183))*(1.0-l9_1186)));
l9_1180=l9_1185;
l9_1176=l9_1180;
l9_1179=l9_1184;
}
l9_1133.x=l9_1176;
l9_1143=l9_1179;
float l9_1187=l9_1133.y;
int l9_1188=l9_1136.y;
bool l9_1189=l9_1142;
float l9_1190=l9_1143;
if ((l9_1188==0)||(l9_1188==3))
{
float l9_1191=l9_1187;
float l9_1192=0.0;
float l9_1193=1.0;
bool l9_1194=l9_1189;
float l9_1195=l9_1190;
float l9_1196=fast::clamp(l9_1191,l9_1192,l9_1193);
float l9_1197=step(abs(l9_1191-l9_1196),9.9999997e-06);
l9_1195*=(l9_1197+((1.0-float(l9_1194))*(1.0-l9_1197)));
l9_1191=l9_1196;
l9_1187=l9_1191;
l9_1190=l9_1195;
}
l9_1133.y=l9_1187;
l9_1143=l9_1190;
float2 l9_1198=l9_1133;
int l9_1199=l9_1131;
int l9_1200=l9_1132;
float l9_1201=l9_1141;
float2 l9_1202=l9_1198;
int l9_1203=l9_1199;
int l9_1204=l9_1200;
float3 l9_1205=float3(0.0);
if (l9_1203==0)
{
l9_1205=float3(l9_1202,0.0);
}
else
{
if (l9_1203==1)
{
l9_1205=float3(l9_1202.x,(l9_1202.y*0.5)+(0.5-(float(l9_1204)*0.5)),0.0);
}
else
{
l9_1205=float3(l9_1202,float(l9_1204));
}
}
float3 l9_1206=l9_1205;
float3 l9_1207=l9_1206;
float4 l9_1208=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1207.xy,bias(l9_1201));
float4 l9_1209=l9_1208;
if (l9_1139)
{
l9_1209=mix(l9_1140,l9_1209,float4(l9_1143));
}
float4 l9_1210=l9_1209;
l9_1124=l9_1210;
float4 l9_1211=float4(0.0);
float4 l9_1212=l9_1124;
float4 l9_1213=float4(0.0);
N16_Value1=l9_1212;
float3 l9_1214=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_1214.x,l9_1214.y,l9_1214.z,N16_Result.w);
N16_Result.w=1.0;
l9_1213=N16_Result;
l9_1211=l9_1213;
float4 l9_1215=float4(0.0);
float3 l9_1216=l9_1211.xyz;
float l9_1217=1.8;
float l9_1218=1.4;
float l9_1219=0.5;
float l9_1220=1.5;
float3 l9_1221=(l9_1216*((l9_1216*l9_1217)+float3(l9_1218)))/((l9_1216*((l9_1216*l9_1217)+float3(l9_1219)))+float3(l9_1220));
l9_1215=float4(l9_1221,l9_1211.w);
float4 l9_1222=float4(0.0);
float4 l9_1223=l9_1215;
float4 l9_1224;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_1224=float4(pow(l9_1223.x,0.45454544),pow(l9_1223.y,0.45454544),pow(l9_1223.z,0.45454544),pow(l9_1223.w,0.45454544));
}
else
{
l9_1224=sqrt(l9_1223);
}
float4 l9_1225=l9_1224;
l9_1222=l9_1225;
l9_1116=l9_1222;
l9_1121=l9_1116;
}
else
{
float2 l9_1226=float2(0.0);
l9_1226=l9_1118.Surface_UVCoord0;
float2 l9_1227=float2(0.0);
l9_1227=l9_1226*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1228=float4(0.0);
int l9_1229;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1230=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1230=0;
}
else
{
l9_1230=in.varStereoViewID;
}
int l9_1231=l9_1230;
l9_1229=1-l9_1231;
}
else
{
int l9_1232=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1232=0;
}
else
{
l9_1232=in.varStereoViewID;
}
int l9_1233=l9_1232;
l9_1229=l9_1233;
}
int l9_1234=l9_1229;
int l9_1235=baseTexLayout_tmp;
int l9_1236=l9_1234;
float2 l9_1237=l9_1227;
bool l9_1238=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1239=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1240=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1241=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1242=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1243=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1244=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1245=0.0;
bool l9_1246=l9_1243&&(!l9_1241);
float l9_1247=1.0;
float l9_1248=l9_1237.x;
int l9_1249=l9_1240.x;
if (l9_1249==1)
{
l9_1248=fract(l9_1248);
}
else
{
if (l9_1249==2)
{
float l9_1250=fract(l9_1248);
float l9_1251=l9_1248-l9_1250;
float l9_1252=step(0.25,fract(l9_1251*0.5));
l9_1248=mix(l9_1250,1.0-l9_1250,fast::clamp(l9_1252,0.0,1.0));
}
}
l9_1237.x=l9_1248;
float l9_1253=l9_1237.y;
int l9_1254=l9_1240.y;
if (l9_1254==1)
{
l9_1253=fract(l9_1253);
}
else
{
if (l9_1254==2)
{
float l9_1255=fract(l9_1253);
float l9_1256=l9_1253-l9_1255;
float l9_1257=step(0.25,fract(l9_1256*0.5));
l9_1253=mix(l9_1255,1.0-l9_1255,fast::clamp(l9_1257,0.0,1.0));
}
}
l9_1237.y=l9_1253;
if (l9_1241)
{
bool l9_1258=l9_1243;
bool l9_1259;
if (l9_1258)
{
l9_1259=l9_1240.x==3;
}
else
{
l9_1259=l9_1258;
}
float l9_1260=l9_1237.x;
float l9_1261=l9_1242.x;
float l9_1262=l9_1242.z;
bool l9_1263=l9_1259;
float l9_1264=l9_1247;
float l9_1265=fast::clamp(l9_1260,l9_1261,l9_1262);
float l9_1266=step(abs(l9_1260-l9_1265),9.9999997e-06);
l9_1264*=(l9_1266+((1.0-float(l9_1263))*(1.0-l9_1266)));
l9_1260=l9_1265;
l9_1237.x=l9_1260;
l9_1247=l9_1264;
bool l9_1267=l9_1243;
bool l9_1268;
if (l9_1267)
{
l9_1268=l9_1240.y==3;
}
else
{
l9_1268=l9_1267;
}
float l9_1269=l9_1237.y;
float l9_1270=l9_1242.y;
float l9_1271=l9_1242.w;
bool l9_1272=l9_1268;
float l9_1273=l9_1247;
float l9_1274=fast::clamp(l9_1269,l9_1270,l9_1271);
float l9_1275=step(abs(l9_1269-l9_1274),9.9999997e-06);
l9_1273*=(l9_1275+((1.0-float(l9_1272))*(1.0-l9_1275)));
l9_1269=l9_1274;
l9_1237.y=l9_1269;
l9_1247=l9_1273;
}
float2 l9_1276=l9_1237;
bool l9_1277=l9_1238;
float3x3 l9_1278=l9_1239;
if (l9_1277)
{
l9_1276=float2((l9_1278*float3(l9_1276,1.0)).xy);
}
float2 l9_1279=l9_1276;
l9_1237=l9_1279;
float l9_1280=l9_1237.x;
int l9_1281=l9_1240.x;
bool l9_1282=l9_1246;
float l9_1283=l9_1247;
if ((l9_1281==0)||(l9_1281==3))
{
float l9_1284=l9_1280;
float l9_1285=0.0;
float l9_1286=1.0;
bool l9_1287=l9_1282;
float l9_1288=l9_1283;
float l9_1289=fast::clamp(l9_1284,l9_1285,l9_1286);
float l9_1290=step(abs(l9_1284-l9_1289),9.9999997e-06);
l9_1288*=(l9_1290+((1.0-float(l9_1287))*(1.0-l9_1290)));
l9_1284=l9_1289;
l9_1280=l9_1284;
l9_1283=l9_1288;
}
l9_1237.x=l9_1280;
l9_1247=l9_1283;
float l9_1291=l9_1237.y;
int l9_1292=l9_1240.y;
bool l9_1293=l9_1246;
float l9_1294=l9_1247;
if ((l9_1292==0)||(l9_1292==3))
{
float l9_1295=l9_1291;
float l9_1296=0.0;
float l9_1297=1.0;
bool l9_1298=l9_1293;
float l9_1299=l9_1294;
float l9_1300=fast::clamp(l9_1295,l9_1296,l9_1297);
float l9_1301=step(abs(l9_1295-l9_1300),9.9999997e-06);
l9_1299*=(l9_1301+((1.0-float(l9_1298))*(1.0-l9_1301)));
l9_1295=l9_1300;
l9_1291=l9_1295;
l9_1294=l9_1299;
}
l9_1237.y=l9_1291;
l9_1247=l9_1294;
float2 l9_1302=l9_1237;
int l9_1303=l9_1235;
int l9_1304=l9_1236;
float l9_1305=l9_1245;
float2 l9_1306=l9_1302;
int l9_1307=l9_1303;
int l9_1308=l9_1304;
float3 l9_1309=float3(0.0);
if (l9_1307==0)
{
l9_1309=float3(l9_1306,0.0);
}
else
{
if (l9_1307==1)
{
l9_1309=float3(l9_1306.x,(l9_1306.y*0.5)+(0.5-(float(l9_1308)*0.5)),0.0);
}
else
{
l9_1309=float3(l9_1306,float(l9_1308));
}
}
float3 l9_1310=l9_1309;
float3 l9_1311=l9_1310;
float4 l9_1312=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1311.xy,bias(l9_1305));
float4 l9_1313=l9_1312;
if (l9_1243)
{
l9_1313=mix(l9_1244,l9_1313,float4(l9_1247));
}
float4 l9_1314=l9_1313;
l9_1228=l9_1314;
l9_1117=l9_1228;
l9_1121=l9_1117;
}
l9_1114=l9_1121;
float l9_1315=0.0;
float4 l9_1316=l9_1114;
float l9_1317=l9_1316.y;
l9_1315=l9_1317;
float l9_1318=0.0;
float l9_1319=0.0;
float l9_1320=(*sc_set0.UserUniforms).Port_Value1_N043;
float l9_1321=0.0;
ssGlobals l9_1322=l9_1109;
float l9_1323=0.0;
float l9_1324=float((*sc_set0.UserUniforms).alpha_channel!=0);
l9_1323=l9_1324;
float l9_1325=0.0;
l9_1325=float(l9_1323==(*sc_set0.UserUniforms).Port_Input1_N034);
l9_1319=l9_1325;
float l9_1326;
if ((l9_1319*1.0)!=0.0)
{
l9_1326=l9_1320;
}
else
{
float4 l9_1327=float4(0.0);
float l9_1328=0.0;
float4 l9_1329=float4(0.0);
float4 l9_1330=float4(0.0);
ssGlobals l9_1331=l9_1322;
float l9_1332=0.0;
float l9_1333=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_1332=l9_1333;
l9_1328=l9_1332;
float4 l9_1334;
if ((l9_1328*1.0)!=0.0)
{
float2 l9_1335=float2(0.0);
l9_1335=l9_1331.Surface_UVCoord0;
float2 l9_1336=float2(0.0);
l9_1336=l9_1335*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1337=float4(0.0);
int l9_1338;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1339=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1339=0;
}
else
{
l9_1339=in.varStereoViewID;
}
int l9_1340=l9_1339;
l9_1338=1-l9_1340;
}
else
{
int l9_1341=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1341=0;
}
else
{
l9_1341=in.varStereoViewID;
}
int l9_1342=l9_1341;
l9_1338=l9_1342;
}
int l9_1343=l9_1338;
int l9_1344=baseTexLayout_tmp;
int l9_1345=l9_1343;
float2 l9_1346=l9_1336;
bool l9_1347=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1348=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1349=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1350=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1351=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1352=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1353=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1354=0.0;
bool l9_1355=l9_1352&&(!l9_1350);
float l9_1356=1.0;
float l9_1357=l9_1346.x;
int l9_1358=l9_1349.x;
if (l9_1358==1)
{
l9_1357=fract(l9_1357);
}
else
{
if (l9_1358==2)
{
float l9_1359=fract(l9_1357);
float l9_1360=l9_1357-l9_1359;
float l9_1361=step(0.25,fract(l9_1360*0.5));
l9_1357=mix(l9_1359,1.0-l9_1359,fast::clamp(l9_1361,0.0,1.0));
}
}
l9_1346.x=l9_1357;
float l9_1362=l9_1346.y;
int l9_1363=l9_1349.y;
if (l9_1363==1)
{
l9_1362=fract(l9_1362);
}
else
{
if (l9_1363==2)
{
float l9_1364=fract(l9_1362);
float l9_1365=l9_1362-l9_1364;
float l9_1366=step(0.25,fract(l9_1365*0.5));
l9_1362=mix(l9_1364,1.0-l9_1364,fast::clamp(l9_1366,0.0,1.0));
}
}
l9_1346.y=l9_1362;
if (l9_1350)
{
bool l9_1367=l9_1352;
bool l9_1368;
if (l9_1367)
{
l9_1368=l9_1349.x==3;
}
else
{
l9_1368=l9_1367;
}
float l9_1369=l9_1346.x;
float l9_1370=l9_1351.x;
float l9_1371=l9_1351.z;
bool l9_1372=l9_1368;
float l9_1373=l9_1356;
float l9_1374=fast::clamp(l9_1369,l9_1370,l9_1371);
float l9_1375=step(abs(l9_1369-l9_1374),9.9999997e-06);
l9_1373*=(l9_1375+((1.0-float(l9_1372))*(1.0-l9_1375)));
l9_1369=l9_1374;
l9_1346.x=l9_1369;
l9_1356=l9_1373;
bool l9_1376=l9_1352;
bool l9_1377;
if (l9_1376)
{
l9_1377=l9_1349.y==3;
}
else
{
l9_1377=l9_1376;
}
float l9_1378=l9_1346.y;
float l9_1379=l9_1351.y;
float l9_1380=l9_1351.w;
bool l9_1381=l9_1377;
float l9_1382=l9_1356;
float l9_1383=fast::clamp(l9_1378,l9_1379,l9_1380);
float l9_1384=step(abs(l9_1378-l9_1383),9.9999997e-06);
l9_1382*=(l9_1384+((1.0-float(l9_1381))*(1.0-l9_1384)));
l9_1378=l9_1383;
l9_1346.y=l9_1378;
l9_1356=l9_1382;
}
float2 l9_1385=l9_1346;
bool l9_1386=l9_1347;
float3x3 l9_1387=l9_1348;
if (l9_1386)
{
l9_1385=float2((l9_1387*float3(l9_1385,1.0)).xy);
}
float2 l9_1388=l9_1385;
l9_1346=l9_1388;
float l9_1389=l9_1346.x;
int l9_1390=l9_1349.x;
bool l9_1391=l9_1355;
float l9_1392=l9_1356;
if ((l9_1390==0)||(l9_1390==3))
{
float l9_1393=l9_1389;
float l9_1394=0.0;
float l9_1395=1.0;
bool l9_1396=l9_1391;
float l9_1397=l9_1392;
float l9_1398=fast::clamp(l9_1393,l9_1394,l9_1395);
float l9_1399=step(abs(l9_1393-l9_1398),9.9999997e-06);
l9_1397*=(l9_1399+((1.0-float(l9_1396))*(1.0-l9_1399)));
l9_1393=l9_1398;
l9_1389=l9_1393;
l9_1392=l9_1397;
}
l9_1346.x=l9_1389;
l9_1356=l9_1392;
float l9_1400=l9_1346.y;
int l9_1401=l9_1349.y;
bool l9_1402=l9_1355;
float l9_1403=l9_1356;
if ((l9_1401==0)||(l9_1401==3))
{
float l9_1404=l9_1400;
float l9_1405=0.0;
float l9_1406=1.0;
bool l9_1407=l9_1402;
float l9_1408=l9_1403;
float l9_1409=fast::clamp(l9_1404,l9_1405,l9_1406);
float l9_1410=step(abs(l9_1404-l9_1409),9.9999997e-06);
l9_1408*=(l9_1410+((1.0-float(l9_1407))*(1.0-l9_1410)));
l9_1404=l9_1409;
l9_1400=l9_1404;
l9_1403=l9_1408;
}
l9_1346.y=l9_1400;
l9_1356=l9_1403;
float2 l9_1411=l9_1346;
int l9_1412=l9_1344;
int l9_1413=l9_1345;
float l9_1414=l9_1354;
float2 l9_1415=l9_1411;
int l9_1416=l9_1412;
int l9_1417=l9_1413;
float3 l9_1418=float3(0.0);
if (l9_1416==0)
{
l9_1418=float3(l9_1415,0.0);
}
else
{
if (l9_1416==1)
{
l9_1418=float3(l9_1415.x,(l9_1415.y*0.5)+(0.5-(float(l9_1417)*0.5)),0.0);
}
else
{
l9_1418=float3(l9_1415,float(l9_1417));
}
}
float3 l9_1419=l9_1418;
float3 l9_1420=l9_1419;
float4 l9_1421=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1420.xy,bias(l9_1414));
float4 l9_1422=l9_1421;
if (l9_1352)
{
l9_1422=mix(l9_1353,l9_1422,float4(l9_1356));
}
float4 l9_1423=l9_1422;
l9_1337=l9_1423;
float4 l9_1424=float4(0.0);
float4 l9_1425=l9_1337;
float4 l9_1426=float4(0.0);
N16_Value1=l9_1425;
float3 l9_1427=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_1427.x,l9_1427.y,l9_1427.z,N16_Result.w);
N16_Result.w=1.0;
l9_1426=N16_Result;
l9_1424=l9_1426;
float4 l9_1428=float4(0.0);
float3 l9_1429=l9_1424.xyz;
float l9_1430=1.8;
float l9_1431=1.4;
float l9_1432=0.5;
float l9_1433=1.5;
float3 l9_1434=(l9_1429*((l9_1429*l9_1430)+float3(l9_1431)))/((l9_1429*((l9_1429*l9_1430)+float3(l9_1432)))+float3(l9_1433));
l9_1428=float4(l9_1434,l9_1424.w);
float4 l9_1435=float4(0.0);
float4 l9_1436=l9_1428;
float4 l9_1437;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_1437=float4(pow(l9_1436.x,0.45454544),pow(l9_1436.y,0.45454544),pow(l9_1436.z,0.45454544),pow(l9_1436.w,0.45454544));
}
else
{
l9_1437=sqrt(l9_1436);
}
float4 l9_1438=l9_1437;
l9_1435=l9_1438;
l9_1329=l9_1435;
l9_1334=l9_1329;
}
else
{
float2 l9_1439=float2(0.0);
l9_1439=l9_1331.Surface_UVCoord0;
float2 l9_1440=float2(0.0);
l9_1440=l9_1439*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1441=float4(0.0);
int l9_1442;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1443=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1443=0;
}
else
{
l9_1443=in.varStereoViewID;
}
int l9_1444=l9_1443;
l9_1442=1-l9_1444;
}
else
{
int l9_1445=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1445=0;
}
else
{
l9_1445=in.varStereoViewID;
}
int l9_1446=l9_1445;
l9_1442=l9_1446;
}
int l9_1447=l9_1442;
int l9_1448=baseTexLayout_tmp;
int l9_1449=l9_1447;
float2 l9_1450=l9_1440;
bool l9_1451=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1452=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1453=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1454=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1455=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1456=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1457=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1458=0.0;
bool l9_1459=l9_1456&&(!l9_1454);
float l9_1460=1.0;
float l9_1461=l9_1450.x;
int l9_1462=l9_1453.x;
if (l9_1462==1)
{
l9_1461=fract(l9_1461);
}
else
{
if (l9_1462==2)
{
float l9_1463=fract(l9_1461);
float l9_1464=l9_1461-l9_1463;
float l9_1465=step(0.25,fract(l9_1464*0.5));
l9_1461=mix(l9_1463,1.0-l9_1463,fast::clamp(l9_1465,0.0,1.0));
}
}
l9_1450.x=l9_1461;
float l9_1466=l9_1450.y;
int l9_1467=l9_1453.y;
if (l9_1467==1)
{
l9_1466=fract(l9_1466);
}
else
{
if (l9_1467==2)
{
float l9_1468=fract(l9_1466);
float l9_1469=l9_1466-l9_1468;
float l9_1470=step(0.25,fract(l9_1469*0.5));
l9_1466=mix(l9_1468,1.0-l9_1468,fast::clamp(l9_1470,0.0,1.0));
}
}
l9_1450.y=l9_1466;
if (l9_1454)
{
bool l9_1471=l9_1456;
bool l9_1472;
if (l9_1471)
{
l9_1472=l9_1453.x==3;
}
else
{
l9_1472=l9_1471;
}
float l9_1473=l9_1450.x;
float l9_1474=l9_1455.x;
float l9_1475=l9_1455.z;
bool l9_1476=l9_1472;
float l9_1477=l9_1460;
float l9_1478=fast::clamp(l9_1473,l9_1474,l9_1475);
float l9_1479=step(abs(l9_1473-l9_1478),9.9999997e-06);
l9_1477*=(l9_1479+((1.0-float(l9_1476))*(1.0-l9_1479)));
l9_1473=l9_1478;
l9_1450.x=l9_1473;
l9_1460=l9_1477;
bool l9_1480=l9_1456;
bool l9_1481;
if (l9_1480)
{
l9_1481=l9_1453.y==3;
}
else
{
l9_1481=l9_1480;
}
float l9_1482=l9_1450.y;
float l9_1483=l9_1455.y;
float l9_1484=l9_1455.w;
bool l9_1485=l9_1481;
float l9_1486=l9_1460;
float l9_1487=fast::clamp(l9_1482,l9_1483,l9_1484);
float l9_1488=step(abs(l9_1482-l9_1487),9.9999997e-06);
l9_1486*=(l9_1488+((1.0-float(l9_1485))*(1.0-l9_1488)));
l9_1482=l9_1487;
l9_1450.y=l9_1482;
l9_1460=l9_1486;
}
float2 l9_1489=l9_1450;
bool l9_1490=l9_1451;
float3x3 l9_1491=l9_1452;
if (l9_1490)
{
l9_1489=float2((l9_1491*float3(l9_1489,1.0)).xy);
}
float2 l9_1492=l9_1489;
l9_1450=l9_1492;
float l9_1493=l9_1450.x;
int l9_1494=l9_1453.x;
bool l9_1495=l9_1459;
float l9_1496=l9_1460;
if ((l9_1494==0)||(l9_1494==3))
{
float l9_1497=l9_1493;
float l9_1498=0.0;
float l9_1499=1.0;
bool l9_1500=l9_1495;
float l9_1501=l9_1496;
float l9_1502=fast::clamp(l9_1497,l9_1498,l9_1499);
float l9_1503=step(abs(l9_1497-l9_1502),9.9999997e-06);
l9_1501*=(l9_1503+((1.0-float(l9_1500))*(1.0-l9_1503)));
l9_1497=l9_1502;
l9_1493=l9_1497;
l9_1496=l9_1501;
}
l9_1450.x=l9_1493;
l9_1460=l9_1496;
float l9_1504=l9_1450.y;
int l9_1505=l9_1453.y;
bool l9_1506=l9_1459;
float l9_1507=l9_1460;
if ((l9_1505==0)||(l9_1505==3))
{
float l9_1508=l9_1504;
float l9_1509=0.0;
float l9_1510=1.0;
bool l9_1511=l9_1506;
float l9_1512=l9_1507;
float l9_1513=fast::clamp(l9_1508,l9_1509,l9_1510);
float l9_1514=step(abs(l9_1508-l9_1513),9.9999997e-06);
l9_1512*=(l9_1514+((1.0-float(l9_1511))*(1.0-l9_1514)));
l9_1508=l9_1513;
l9_1504=l9_1508;
l9_1507=l9_1512;
}
l9_1450.y=l9_1504;
l9_1460=l9_1507;
float2 l9_1515=l9_1450;
int l9_1516=l9_1448;
int l9_1517=l9_1449;
float l9_1518=l9_1458;
float2 l9_1519=l9_1515;
int l9_1520=l9_1516;
int l9_1521=l9_1517;
float3 l9_1522=float3(0.0);
if (l9_1520==0)
{
l9_1522=float3(l9_1519,0.0);
}
else
{
if (l9_1520==1)
{
l9_1522=float3(l9_1519.x,(l9_1519.y*0.5)+(0.5-(float(l9_1521)*0.5)),0.0);
}
else
{
l9_1522=float3(l9_1519,float(l9_1521));
}
}
float3 l9_1523=l9_1522;
float3 l9_1524=l9_1523;
float4 l9_1525=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1524.xy,bias(l9_1518));
float4 l9_1526=l9_1525;
if (l9_1456)
{
l9_1526=mix(l9_1457,l9_1526,float4(l9_1460));
}
float4 l9_1527=l9_1526;
l9_1441=l9_1527;
l9_1330=l9_1441;
l9_1334=l9_1330;
}
l9_1327=l9_1334;
float l9_1528=0.0;
float4 l9_1529=l9_1327;
float l9_1530=l9_1529.w;
l9_1528=l9_1530;
l9_1321=l9_1528;
l9_1326=l9_1321;
}
l9_1318=l9_1326;
float4 l9_1531=float4(0.0);
l9_1531.x=l9_1315;
l9_1531.y=l9_1315;
l9_1531.z=l9_1315;
l9_1531.w=l9_1318;
l9_1107=l9_1531;
l9_1113=l9_1107;
}
else
{
float4 l9_1532=float4(0.0);
float l9_1533=0.0;
float4 l9_1534=float4(0.0);
float4 l9_1535=(*sc_set0.UserUniforms).Port_Default_N055;
ssGlobals l9_1536=l9_1109;
float l9_1537=0.0;
float l9_1538=float((*sc_set0.UserUniforms).blue_channel!=0);
l9_1537=l9_1538;
float l9_1539=0.0;
l9_1539=float(l9_1537==(*sc_set0.UserUniforms).Port_Input1_N053);
l9_1533=l9_1539;
float4 l9_1540;
if ((l9_1533*1.0)!=0.0)
{
float4 l9_1541=float4(0.0);
float l9_1542=0.0;
float4 l9_1543=float4(0.0);
float4 l9_1544=float4(0.0);
ssGlobals l9_1545=l9_1536;
float l9_1546=0.0;
float l9_1547=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_1546=l9_1547;
l9_1542=l9_1546;
float4 l9_1548;
if ((l9_1542*1.0)!=0.0)
{
float2 l9_1549=float2(0.0);
l9_1549=l9_1545.Surface_UVCoord0;
float2 l9_1550=float2(0.0);
l9_1550=l9_1549*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1551=float4(0.0);
int l9_1552;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1553=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1553=0;
}
else
{
l9_1553=in.varStereoViewID;
}
int l9_1554=l9_1553;
l9_1552=1-l9_1554;
}
else
{
int l9_1555=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1555=0;
}
else
{
l9_1555=in.varStereoViewID;
}
int l9_1556=l9_1555;
l9_1552=l9_1556;
}
int l9_1557=l9_1552;
int l9_1558=baseTexLayout_tmp;
int l9_1559=l9_1557;
float2 l9_1560=l9_1550;
bool l9_1561=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1562=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1563=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1564=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1565=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1566=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1567=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1568=0.0;
bool l9_1569=l9_1566&&(!l9_1564);
float l9_1570=1.0;
float l9_1571=l9_1560.x;
int l9_1572=l9_1563.x;
if (l9_1572==1)
{
l9_1571=fract(l9_1571);
}
else
{
if (l9_1572==2)
{
float l9_1573=fract(l9_1571);
float l9_1574=l9_1571-l9_1573;
float l9_1575=step(0.25,fract(l9_1574*0.5));
l9_1571=mix(l9_1573,1.0-l9_1573,fast::clamp(l9_1575,0.0,1.0));
}
}
l9_1560.x=l9_1571;
float l9_1576=l9_1560.y;
int l9_1577=l9_1563.y;
if (l9_1577==1)
{
l9_1576=fract(l9_1576);
}
else
{
if (l9_1577==2)
{
float l9_1578=fract(l9_1576);
float l9_1579=l9_1576-l9_1578;
float l9_1580=step(0.25,fract(l9_1579*0.5));
l9_1576=mix(l9_1578,1.0-l9_1578,fast::clamp(l9_1580,0.0,1.0));
}
}
l9_1560.y=l9_1576;
if (l9_1564)
{
bool l9_1581=l9_1566;
bool l9_1582;
if (l9_1581)
{
l9_1582=l9_1563.x==3;
}
else
{
l9_1582=l9_1581;
}
float l9_1583=l9_1560.x;
float l9_1584=l9_1565.x;
float l9_1585=l9_1565.z;
bool l9_1586=l9_1582;
float l9_1587=l9_1570;
float l9_1588=fast::clamp(l9_1583,l9_1584,l9_1585);
float l9_1589=step(abs(l9_1583-l9_1588),9.9999997e-06);
l9_1587*=(l9_1589+((1.0-float(l9_1586))*(1.0-l9_1589)));
l9_1583=l9_1588;
l9_1560.x=l9_1583;
l9_1570=l9_1587;
bool l9_1590=l9_1566;
bool l9_1591;
if (l9_1590)
{
l9_1591=l9_1563.y==3;
}
else
{
l9_1591=l9_1590;
}
float l9_1592=l9_1560.y;
float l9_1593=l9_1565.y;
float l9_1594=l9_1565.w;
bool l9_1595=l9_1591;
float l9_1596=l9_1570;
float l9_1597=fast::clamp(l9_1592,l9_1593,l9_1594);
float l9_1598=step(abs(l9_1592-l9_1597),9.9999997e-06);
l9_1596*=(l9_1598+((1.0-float(l9_1595))*(1.0-l9_1598)));
l9_1592=l9_1597;
l9_1560.y=l9_1592;
l9_1570=l9_1596;
}
float2 l9_1599=l9_1560;
bool l9_1600=l9_1561;
float3x3 l9_1601=l9_1562;
if (l9_1600)
{
l9_1599=float2((l9_1601*float3(l9_1599,1.0)).xy);
}
float2 l9_1602=l9_1599;
l9_1560=l9_1602;
float l9_1603=l9_1560.x;
int l9_1604=l9_1563.x;
bool l9_1605=l9_1569;
float l9_1606=l9_1570;
if ((l9_1604==0)||(l9_1604==3))
{
float l9_1607=l9_1603;
float l9_1608=0.0;
float l9_1609=1.0;
bool l9_1610=l9_1605;
float l9_1611=l9_1606;
float l9_1612=fast::clamp(l9_1607,l9_1608,l9_1609);
float l9_1613=step(abs(l9_1607-l9_1612),9.9999997e-06);
l9_1611*=(l9_1613+((1.0-float(l9_1610))*(1.0-l9_1613)));
l9_1607=l9_1612;
l9_1603=l9_1607;
l9_1606=l9_1611;
}
l9_1560.x=l9_1603;
l9_1570=l9_1606;
float l9_1614=l9_1560.y;
int l9_1615=l9_1563.y;
bool l9_1616=l9_1569;
float l9_1617=l9_1570;
if ((l9_1615==0)||(l9_1615==3))
{
float l9_1618=l9_1614;
float l9_1619=0.0;
float l9_1620=1.0;
bool l9_1621=l9_1616;
float l9_1622=l9_1617;
float l9_1623=fast::clamp(l9_1618,l9_1619,l9_1620);
float l9_1624=step(abs(l9_1618-l9_1623),9.9999997e-06);
l9_1622*=(l9_1624+((1.0-float(l9_1621))*(1.0-l9_1624)));
l9_1618=l9_1623;
l9_1614=l9_1618;
l9_1617=l9_1622;
}
l9_1560.y=l9_1614;
l9_1570=l9_1617;
float2 l9_1625=l9_1560;
int l9_1626=l9_1558;
int l9_1627=l9_1559;
float l9_1628=l9_1568;
float2 l9_1629=l9_1625;
int l9_1630=l9_1626;
int l9_1631=l9_1627;
float3 l9_1632=float3(0.0);
if (l9_1630==0)
{
l9_1632=float3(l9_1629,0.0);
}
else
{
if (l9_1630==1)
{
l9_1632=float3(l9_1629.x,(l9_1629.y*0.5)+(0.5-(float(l9_1631)*0.5)),0.0);
}
else
{
l9_1632=float3(l9_1629,float(l9_1631));
}
}
float3 l9_1633=l9_1632;
float3 l9_1634=l9_1633;
float4 l9_1635=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1634.xy,bias(l9_1628));
float4 l9_1636=l9_1635;
if (l9_1566)
{
l9_1636=mix(l9_1567,l9_1636,float4(l9_1570));
}
float4 l9_1637=l9_1636;
l9_1551=l9_1637;
float4 l9_1638=float4(0.0);
float4 l9_1639=l9_1551;
float4 l9_1640=float4(0.0);
N16_Value1=l9_1639;
float3 l9_1641=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_1641.x,l9_1641.y,l9_1641.z,N16_Result.w);
N16_Result.w=1.0;
l9_1640=N16_Result;
l9_1638=l9_1640;
float4 l9_1642=float4(0.0);
float3 l9_1643=l9_1638.xyz;
float l9_1644=1.8;
float l9_1645=1.4;
float l9_1646=0.5;
float l9_1647=1.5;
float3 l9_1648=(l9_1643*((l9_1643*l9_1644)+float3(l9_1645)))/((l9_1643*((l9_1643*l9_1644)+float3(l9_1646)))+float3(l9_1647));
l9_1642=float4(l9_1648,l9_1638.w);
float4 l9_1649=float4(0.0);
float4 l9_1650=l9_1642;
float4 l9_1651;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_1651=float4(pow(l9_1650.x,0.45454544),pow(l9_1650.y,0.45454544),pow(l9_1650.z,0.45454544),pow(l9_1650.w,0.45454544));
}
else
{
l9_1651=sqrt(l9_1650);
}
float4 l9_1652=l9_1651;
l9_1649=l9_1652;
l9_1543=l9_1649;
l9_1548=l9_1543;
}
else
{
float2 l9_1653=float2(0.0);
l9_1653=l9_1545.Surface_UVCoord0;
float2 l9_1654=float2(0.0);
l9_1654=l9_1653*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1655=float4(0.0);
int l9_1656;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1657=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1657=0;
}
else
{
l9_1657=in.varStereoViewID;
}
int l9_1658=l9_1657;
l9_1656=1-l9_1658;
}
else
{
int l9_1659=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1659=0;
}
else
{
l9_1659=in.varStereoViewID;
}
int l9_1660=l9_1659;
l9_1656=l9_1660;
}
int l9_1661=l9_1656;
int l9_1662=baseTexLayout_tmp;
int l9_1663=l9_1661;
float2 l9_1664=l9_1654;
bool l9_1665=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1666=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1667=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1668=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1669=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1670=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1671=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1672=0.0;
bool l9_1673=l9_1670&&(!l9_1668);
float l9_1674=1.0;
float l9_1675=l9_1664.x;
int l9_1676=l9_1667.x;
if (l9_1676==1)
{
l9_1675=fract(l9_1675);
}
else
{
if (l9_1676==2)
{
float l9_1677=fract(l9_1675);
float l9_1678=l9_1675-l9_1677;
float l9_1679=step(0.25,fract(l9_1678*0.5));
l9_1675=mix(l9_1677,1.0-l9_1677,fast::clamp(l9_1679,0.0,1.0));
}
}
l9_1664.x=l9_1675;
float l9_1680=l9_1664.y;
int l9_1681=l9_1667.y;
if (l9_1681==1)
{
l9_1680=fract(l9_1680);
}
else
{
if (l9_1681==2)
{
float l9_1682=fract(l9_1680);
float l9_1683=l9_1680-l9_1682;
float l9_1684=step(0.25,fract(l9_1683*0.5));
l9_1680=mix(l9_1682,1.0-l9_1682,fast::clamp(l9_1684,0.0,1.0));
}
}
l9_1664.y=l9_1680;
if (l9_1668)
{
bool l9_1685=l9_1670;
bool l9_1686;
if (l9_1685)
{
l9_1686=l9_1667.x==3;
}
else
{
l9_1686=l9_1685;
}
float l9_1687=l9_1664.x;
float l9_1688=l9_1669.x;
float l9_1689=l9_1669.z;
bool l9_1690=l9_1686;
float l9_1691=l9_1674;
float l9_1692=fast::clamp(l9_1687,l9_1688,l9_1689);
float l9_1693=step(abs(l9_1687-l9_1692),9.9999997e-06);
l9_1691*=(l9_1693+((1.0-float(l9_1690))*(1.0-l9_1693)));
l9_1687=l9_1692;
l9_1664.x=l9_1687;
l9_1674=l9_1691;
bool l9_1694=l9_1670;
bool l9_1695;
if (l9_1694)
{
l9_1695=l9_1667.y==3;
}
else
{
l9_1695=l9_1694;
}
float l9_1696=l9_1664.y;
float l9_1697=l9_1669.y;
float l9_1698=l9_1669.w;
bool l9_1699=l9_1695;
float l9_1700=l9_1674;
float l9_1701=fast::clamp(l9_1696,l9_1697,l9_1698);
float l9_1702=step(abs(l9_1696-l9_1701),9.9999997e-06);
l9_1700*=(l9_1702+((1.0-float(l9_1699))*(1.0-l9_1702)));
l9_1696=l9_1701;
l9_1664.y=l9_1696;
l9_1674=l9_1700;
}
float2 l9_1703=l9_1664;
bool l9_1704=l9_1665;
float3x3 l9_1705=l9_1666;
if (l9_1704)
{
l9_1703=float2((l9_1705*float3(l9_1703,1.0)).xy);
}
float2 l9_1706=l9_1703;
l9_1664=l9_1706;
float l9_1707=l9_1664.x;
int l9_1708=l9_1667.x;
bool l9_1709=l9_1673;
float l9_1710=l9_1674;
if ((l9_1708==0)||(l9_1708==3))
{
float l9_1711=l9_1707;
float l9_1712=0.0;
float l9_1713=1.0;
bool l9_1714=l9_1709;
float l9_1715=l9_1710;
float l9_1716=fast::clamp(l9_1711,l9_1712,l9_1713);
float l9_1717=step(abs(l9_1711-l9_1716),9.9999997e-06);
l9_1715*=(l9_1717+((1.0-float(l9_1714))*(1.0-l9_1717)));
l9_1711=l9_1716;
l9_1707=l9_1711;
l9_1710=l9_1715;
}
l9_1664.x=l9_1707;
l9_1674=l9_1710;
float l9_1718=l9_1664.y;
int l9_1719=l9_1667.y;
bool l9_1720=l9_1673;
float l9_1721=l9_1674;
if ((l9_1719==0)||(l9_1719==3))
{
float l9_1722=l9_1718;
float l9_1723=0.0;
float l9_1724=1.0;
bool l9_1725=l9_1720;
float l9_1726=l9_1721;
float l9_1727=fast::clamp(l9_1722,l9_1723,l9_1724);
float l9_1728=step(abs(l9_1722-l9_1727),9.9999997e-06);
l9_1726*=(l9_1728+((1.0-float(l9_1725))*(1.0-l9_1728)));
l9_1722=l9_1727;
l9_1718=l9_1722;
l9_1721=l9_1726;
}
l9_1664.y=l9_1718;
l9_1674=l9_1721;
float2 l9_1729=l9_1664;
int l9_1730=l9_1662;
int l9_1731=l9_1663;
float l9_1732=l9_1672;
float2 l9_1733=l9_1729;
int l9_1734=l9_1730;
int l9_1735=l9_1731;
float3 l9_1736=float3(0.0);
if (l9_1734==0)
{
l9_1736=float3(l9_1733,0.0);
}
else
{
if (l9_1734==1)
{
l9_1736=float3(l9_1733.x,(l9_1733.y*0.5)+(0.5-(float(l9_1735)*0.5)),0.0);
}
else
{
l9_1736=float3(l9_1733,float(l9_1735));
}
}
float3 l9_1737=l9_1736;
float3 l9_1738=l9_1737;
float4 l9_1739=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1738.xy,bias(l9_1732));
float4 l9_1740=l9_1739;
if (l9_1670)
{
l9_1740=mix(l9_1671,l9_1740,float4(l9_1674));
}
float4 l9_1741=l9_1740;
l9_1655=l9_1741;
l9_1544=l9_1655;
l9_1548=l9_1544;
}
l9_1541=l9_1548;
float l9_1742=0.0;
float4 l9_1743=l9_1541;
float l9_1744=l9_1743.z;
l9_1742=l9_1744;
float l9_1745=0.0;
float l9_1746=0.0;
float l9_1747=(*sc_set0.UserUniforms).Port_Value1_N043;
float l9_1748=0.0;
ssGlobals l9_1749=l9_1536;
float l9_1750=0.0;
float l9_1751=float((*sc_set0.UserUniforms).alpha_channel!=0);
l9_1750=l9_1751;
float l9_1752=0.0;
l9_1752=float(l9_1750==(*sc_set0.UserUniforms).Port_Input1_N034);
l9_1746=l9_1752;
float l9_1753;
if ((l9_1746*1.0)!=0.0)
{
l9_1753=l9_1747;
}
else
{
float4 l9_1754=float4(0.0);
float l9_1755=0.0;
float4 l9_1756=float4(0.0);
float4 l9_1757=float4(0.0);
ssGlobals l9_1758=l9_1749;
float l9_1759=0.0;
float l9_1760=float((*sc_set0.UserUniforms).envmap_preview!=0);
l9_1759=l9_1760;
l9_1755=l9_1759;
float4 l9_1761;
if ((l9_1755*1.0)!=0.0)
{
float2 l9_1762=float2(0.0);
l9_1762=l9_1758.Surface_UVCoord0;
float2 l9_1763=float2(0.0);
l9_1763=l9_1762*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1764=float4(0.0);
int l9_1765;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1766=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1766=0;
}
else
{
l9_1766=in.varStereoViewID;
}
int l9_1767=l9_1766;
l9_1765=1-l9_1767;
}
else
{
int l9_1768=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1768=0;
}
else
{
l9_1768=in.varStereoViewID;
}
int l9_1769=l9_1768;
l9_1765=l9_1769;
}
int l9_1770=l9_1765;
int l9_1771=baseTexLayout_tmp;
int l9_1772=l9_1770;
float2 l9_1773=l9_1763;
bool l9_1774=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1775=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1776=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1777=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1778=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1779=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1780=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1781=0.0;
bool l9_1782=l9_1779&&(!l9_1777);
float l9_1783=1.0;
float l9_1784=l9_1773.x;
int l9_1785=l9_1776.x;
if (l9_1785==1)
{
l9_1784=fract(l9_1784);
}
else
{
if (l9_1785==2)
{
float l9_1786=fract(l9_1784);
float l9_1787=l9_1784-l9_1786;
float l9_1788=step(0.25,fract(l9_1787*0.5));
l9_1784=mix(l9_1786,1.0-l9_1786,fast::clamp(l9_1788,0.0,1.0));
}
}
l9_1773.x=l9_1784;
float l9_1789=l9_1773.y;
int l9_1790=l9_1776.y;
if (l9_1790==1)
{
l9_1789=fract(l9_1789);
}
else
{
if (l9_1790==2)
{
float l9_1791=fract(l9_1789);
float l9_1792=l9_1789-l9_1791;
float l9_1793=step(0.25,fract(l9_1792*0.5));
l9_1789=mix(l9_1791,1.0-l9_1791,fast::clamp(l9_1793,0.0,1.0));
}
}
l9_1773.y=l9_1789;
if (l9_1777)
{
bool l9_1794=l9_1779;
bool l9_1795;
if (l9_1794)
{
l9_1795=l9_1776.x==3;
}
else
{
l9_1795=l9_1794;
}
float l9_1796=l9_1773.x;
float l9_1797=l9_1778.x;
float l9_1798=l9_1778.z;
bool l9_1799=l9_1795;
float l9_1800=l9_1783;
float l9_1801=fast::clamp(l9_1796,l9_1797,l9_1798);
float l9_1802=step(abs(l9_1796-l9_1801),9.9999997e-06);
l9_1800*=(l9_1802+((1.0-float(l9_1799))*(1.0-l9_1802)));
l9_1796=l9_1801;
l9_1773.x=l9_1796;
l9_1783=l9_1800;
bool l9_1803=l9_1779;
bool l9_1804;
if (l9_1803)
{
l9_1804=l9_1776.y==3;
}
else
{
l9_1804=l9_1803;
}
float l9_1805=l9_1773.y;
float l9_1806=l9_1778.y;
float l9_1807=l9_1778.w;
bool l9_1808=l9_1804;
float l9_1809=l9_1783;
float l9_1810=fast::clamp(l9_1805,l9_1806,l9_1807);
float l9_1811=step(abs(l9_1805-l9_1810),9.9999997e-06);
l9_1809*=(l9_1811+((1.0-float(l9_1808))*(1.0-l9_1811)));
l9_1805=l9_1810;
l9_1773.y=l9_1805;
l9_1783=l9_1809;
}
float2 l9_1812=l9_1773;
bool l9_1813=l9_1774;
float3x3 l9_1814=l9_1775;
if (l9_1813)
{
l9_1812=float2((l9_1814*float3(l9_1812,1.0)).xy);
}
float2 l9_1815=l9_1812;
l9_1773=l9_1815;
float l9_1816=l9_1773.x;
int l9_1817=l9_1776.x;
bool l9_1818=l9_1782;
float l9_1819=l9_1783;
if ((l9_1817==0)||(l9_1817==3))
{
float l9_1820=l9_1816;
float l9_1821=0.0;
float l9_1822=1.0;
bool l9_1823=l9_1818;
float l9_1824=l9_1819;
float l9_1825=fast::clamp(l9_1820,l9_1821,l9_1822);
float l9_1826=step(abs(l9_1820-l9_1825),9.9999997e-06);
l9_1824*=(l9_1826+((1.0-float(l9_1823))*(1.0-l9_1826)));
l9_1820=l9_1825;
l9_1816=l9_1820;
l9_1819=l9_1824;
}
l9_1773.x=l9_1816;
l9_1783=l9_1819;
float l9_1827=l9_1773.y;
int l9_1828=l9_1776.y;
bool l9_1829=l9_1782;
float l9_1830=l9_1783;
if ((l9_1828==0)||(l9_1828==3))
{
float l9_1831=l9_1827;
float l9_1832=0.0;
float l9_1833=1.0;
bool l9_1834=l9_1829;
float l9_1835=l9_1830;
float l9_1836=fast::clamp(l9_1831,l9_1832,l9_1833);
float l9_1837=step(abs(l9_1831-l9_1836),9.9999997e-06);
l9_1835*=(l9_1837+((1.0-float(l9_1834))*(1.0-l9_1837)));
l9_1831=l9_1836;
l9_1827=l9_1831;
l9_1830=l9_1835;
}
l9_1773.y=l9_1827;
l9_1783=l9_1830;
float2 l9_1838=l9_1773;
int l9_1839=l9_1771;
int l9_1840=l9_1772;
float l9_1841=l9_1781;
float2 l9_1842=l9_1838;
int l9_1843=l9_1839;
int l9_1844=l9_1840;
float3 l9_1845=float3(0.0);
if (l9_1843==0)
{
l9_1845=float3(l9_1842,0.0);
}
else
{
if (l9_1843==1)
{
l9_1845=float3(l9_1842.x,(l9_1842.y*0.5)+(0.5-(float(l9_1844)*0.5)),0.0);
}
else
{
l9_1845=float3(l9_1842,float(l9_1844));
}
}
float3 l9_1846=l9_1845;
float3 l9_1847=l9_1846;
float4 l9_1848=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1847.xy,bias(l9_1841));
float4 l9_1849=l9_1848;
if (l9_1779)
{
l9_1849=mix(l9_1780,l9_1849,float4(l9_1783));
}
float4 l9_1850=l9_1849;
l9_1764=l9_1850;
float4 l9_1851=float4(0.0);
float4 l9_1852=l9_1764;
float4 l9_1853=float4(0.0);
N16_Value1=l9_1852;
float3 l9_1854=N16_Value1.xyz/float3(N16_Value1.w);
N16_Result=float4(l9_1854.x,l9_1854.y,l9_1854.z,N16_Result.w);
N16_Result.w=1.0;
l9_1853=N16_Result;
l9_1851=l9_1853;
float4 l9_1855=float4(0.0);
float3 l9_1856=l9_1851.xyz;
float l9_1857=1.8;
float l9_1858=1.4;
float l9_1859=0.5;
float l9_1860=1.5;
float3 l9_1861=(l9_1856*((l9_1856*l9_1857)+float3(l9_1858)))/((l9_1856*((l9_1856*l9_1857)+float3(l9_1859)))+float3(l9_1860));
l9_1855=float4(l9_1861,l9_1851.w);
float4 l9_1862=float4(0.0);
float4 l9_1863=l9_1855;
float4 l9_1864;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_1864=float4(pow(l9_1863.x,0.45454544),pow(l9_1863.y,0.45454544),pow(l9_1863.z,0.45454544),pow(l9_1863.w,0.45454544));
}
else
{
l9_1864=sqrt(l9_1863);
}
float4 l9_1865=l9_1864;
l9_1862=l9_1865;
l9_1756=l9_1862;
l9_1761=l9_1756;
}
else
{
float2 l9_1866=float2(0.0);
l9_1866=l9_1758.Surface_UVCoord0;
float2 l9_1867=float2(0.0);
l9_1867=l9_1866*(*sc_set0.UserUniforms).Port_Input1_N057;
float4 l9_1868=float4(0.0);
int l9_1869;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_1870=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1870=0;
}
else
{
l9_1870=in.varStereoViewID;
}
int l9_1871=l9_1870;
l9_1869=1-l9_1871;
}
else
{
int l9_1872=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1872=0;
}
else
{
l9_1872=in.varStereoViewID;
}
int l9_1873=l9_1872;
l9_1869=l9_1873;
}
int l9_1874=l9_1869;
int l9_1875=baseTexLayout_tmp;
int l9_1876=l9_1874;
float2 l9_1877=l9_1867;
bool l9_1878=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_1879=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_1880=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_1881=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_1882=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_1883=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_1884=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_1885=0.0;
bool l9_1886=l9_1883&&(!l9_1881);
float l9_1887=1.0;
float l9_1888=l9_1877.x;
int l9_1889=l9_1880.x;
if (l9_1889==1)
{
l9_1888=fract(l9_1888);
}
else
{
if (l9_1889==2)
{
float l9_1890=fract(l9_1888);
float l9_1891=l9_1888-l9_1890;
float l9_1892=step(0.25,fract(l9_1891*0.5));
l9_1888=mix(l9_1890,1.0-l9_1890,fast::clamp(l9_1892,0.0,1.0));
}
}
l9_1877.x=l9_1888;
float l9_1893=l9_1877.y;
int l9_1894=l9_1880.y;
if (l9_1894==1)
{
l9_1893=fract(l9_1893);
}
else
{
if (l9_1894==2)
{
float l9_1895=fract(l9_1893);
float l9_1896=l9_1893-l9_1895;
float l9_1897=step(0.25,fract(l9_1896*0.5));
l9_1893=mix(l9_1895,1.0-l9_1895,fast::clamp(l9_1897,0.0,1.0));
}
}
l9_1877.y=l9_1893;
if (l9_1881)
{
bool l9_1898=l9_1883;
bool l9_1899;
if (l9_1898)
{
l9_1899=l9_1880.x==3;
}
else
{
l9_1899=l9_1898;
}
float l9_1900=l9_1877.x;
float l9_1901=l9_1882.x;
float l9_1902=l9_1882.z;
bool l9_1903=l9_1899;
float l9_1904=l9_1887;
float l9_1905=fast::clamp(l9_1900,l9_1901,l9_1902);
float l9_1906=step(abs(l9_1900-l9_1905),9.9999997e-06);
l9_1904*=(l9_1906+((1.0-float(l9_1903))*(1.0-l9_1906)));
l9_1900=l9_1905;
l9_1877.x=l9_1900;
l9_1887=l9_1904;
bool l9_1907=l9_1883;
bool l9_1908;
if (l9_1907)
{
l9_1908=l9_1880.y==3;
}
else
{
l9_1908=l9_1907;
}
float l9_1909=l9_1877.y;
float l9_1910=l9_1882.y;
float l9_1911=l9_1882.w;
bool l9_1912=l9_1908;
float l9_1913=l9_1887;
float l9_1914=fast::clamp(l9_1909,l9_1910,l9_1911);
float l9_1915=step(abs(l9_1909-l9_1914),9.9999997e-06);
l9_1913*=(l9_1915+((1.0-float(l9_1912))*(1.0-l9_1915)));
l9_1909=l9_1914;
l9_1877.y=l9_1909;
l9_1887=l9_1913;
}
float2 l9_1916=l9_1877;
bool l9_1917=l9_1878;
float3x3 l9_1918=l9_1879;
if (l9_1917)
{
l9_1916=float2((l9_1918*float3(l9_1916,1.0)).xy);
}
float2 l9_1919=l9_1916;
l9_1877=l9_1919;
float l9_1920=l9_1877.x;
int l9_1921=l9_1880.x;
bool l9_1922=l9_1886;
float l9_1923=l9_1887;
if ((l9_1921==0)||(l9_1921==3))
{
float l9_1924=l9_1920;
float l9_1925=0.0;
float l9_1926=1.0;
bool l9_1927=l9_1922;
float l9_1928=l9_1923;
float l9_1929=fast::clamp(l9_1924,l9_1925,l9_1926);
float l9_1930=step(abs(l9_1924-l9_1929),9.9999997e-06);
l9_1928*=(l9_1930+((1.0-float(l9_1927))*(1.0-l9_1930)));
l9_1924=l9_1929;
l9_1920=l9_1924;
l9_1923=l9_1928;
}
l9_1877.x=l9_1920;
l9_1887=l9_1923;
float l9_1931=l9_1877.y;
int l9_1932=l9_1880.y;
bool l9_1933=l9_1886;
float l9_1934=l9_1887;
if ((l9_1932==0)||(l9_1932==3))
{
float l9_1935=l9_1931;
float l9_1936=0.0;
float l9_1937=1.0;
bool l9_1938=l9_1933;
float l9_1939=l9_1934;
float l9_1940=fast::clamp(l9_1935,l9_1936,l9_1937);
float l9_1941=step(abs(l9_1935-l9_1940),9.9999997e-06);
l9_1939*=(l9_1941+((1.0-float(l9_1938))*(1.0-l9_1941)));
l9_1935=l9_1940;
l9_1931=l9_1935;
l9_1934=l9_1939;
}
l9_1877.y=l9_1931;
l9_1887=l9_1934;
float2 l9_1942=l9_1877;
int l9_1943=l9_1875;
int l9_1944=l9_1876;
float l9_1945=l9_1885;
float2 l9_1946=l9_1942;
int l9_1947=l9_1943;
int l9_1948=l9_1944;
float3 l9_1949=float3(0.0);
if (l9_1947==0)
{
l9_1949=float3(l9_1946,0.0);
}
else
{
if (l9_1947==1)
{
l9_1949=float3(l9_1946.x,(l9_1946.y*0.5)+(0.5-(float(l9_1948)*0.5)),0.0);
}
else
{
l9_1949=float3(l9_1946,float(l9_1948));
}
}
float3 l9_1950=l9_1949;
float3 l9_1951=l9_1950;
float4 l9_1952=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_1951.xy,bias(l9_1945));
float4 l9_1953=l9_1952;
if (l9_1883)
{
l9_1953=mix(l9_1884,l9_1953,float4(l9_1887));
}
float4 l9_1954=l9_1953;
l9_1868=l9_1954;
l9_1757=l9_1868;
l9_1761=l9_1757;
}
l9_1754=l9_1761;
float l9_1955=0.0;
float4 l9_1956=l9_1754;
float l9_1957=l9_1956.w;
l9_1955=l9_1957;
l9_1748=l9_1955;
l9_1753=l9_1748;
}
l9_1745=l9_1753;
float4 l9_1958=float4(0.0);
l9_1958.x=l9_1742;
l9_1958.y=l9_1742;
l9_1958.z=l9_1742;
l9_1958.w=l9_1745;
l9_1534=l9_1958;
l9_1540=l9_1534;
}
else
{
l9_1540=l9_1535;
}
l9_1532=l9_1540;
l9_1108=l9_1532;
l9_1113=l9_1108;
}
l9_1105=l9_1113;
l9_681=l9_1105;
l9_686=l9_681;
}
l9_678=l9_686;
l9_666=l9_678;
l9_677=l9_666;
}
else
{
l9_677=l9_667;
}
l9_664=l9_677;
l9_222=l9_664;
l9_232=l9_222;
}
l9_219=l9_232;
param_3=l9_219;
param_4=param_3;
}
Result_N11=param_4;
FinalColor=Result_N11;
float param_6=FinalColor.w;
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
if (param_6<(*sc_set0.UserUniforms).alphaTestThreshold)
{
discard_fragment();
}
}
if ((int(ENABLE_STIPPLE_PATTERN_TEST_tmp)!=0))
{
float4 l9_1959=gl_FragCoord;
float2 l9_1960=floor(mod(l9_1959.xy,float2(4.0)));
float l9_1961=(mod(dot(l9_1960,float2(4.0,1.0))*9.0,16.0)+1.0)/17.0;
if (param_6<l9_1961)
{
discard_fragment();
}
}
if ((*sc_set0.UserUniforms).sc_RayTracingCasterConfiguration.x!=0u)
{
float4 param_7=FinalColor;
if ((int(sc_RayTracingCasterForceOpaque_tmp)!=0))
{
param_7.w=1.0;
}
float4 l9_1962=fast::max(param_7,float4(0.0));
float4 param_8=l9_1962;
if (sc_ShaderCacheConstant_tmp!=0)
{
param_8.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
out.sc_FragData0=param_8;
return out;
}
float4 param_9=FinalColor;
if ((int(sc_ProjectiveShadowsCaster_tmp)!=0))
{
float4 l9_1963=param_9;
float4 l9_1964=l9_1963;
float l9_1965=1.0;
if ((((int(sc_BlendMode_Normal_tmp)!=0)||(int(sc_BlendMode_AlphaToCoverage_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaHardware_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_1965=l9_1964.w;
}
else
{
if ((int(sc_BlendMode_PremultipliedAlpha_tmp)!=0))
{
l9_1965=fast::clamp(l9_1964.w*2.0,0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_1965=fast::clamp(dot(l9_1964.xyz,float3(l9_1964.w)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
l9_1965=1.0;
}
else
{
if ((int(sc_BlendMode_Multiply_tmp)!=0))
{
l9_1965=(1.0-dot(l9_1964.xyz,float3(0.33333001)))*l9_1964.w;
}
else
{
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_1965=(1.0-fast::clamp(dot(l9_1964.xyz,float3(1.0)),0.0,1.0))*l9_1964.w;
}
else
{
if ((int(sc_BlendMode_ColoredGlass_tmp)!=0))
{
l9_1965=fast::clamp(dot(l9_1964.xyz,float3(1.0)),0.0,1.0)*l9_1964.w;
}
else
{
if ((int(sc_BlendMode_Add_tmp)!=0))
{
l9_1965=fast::clamp(dot(l9_1964.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_1965=fast::clamp(dot(l9_1964.xyz,float3(1.0)),0.0,1.0)*l9_1964.w;
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0))
{
l9_1965=dot(l9_1964.xyz,float3(0.33333001))*l9_1964.w;
}
else
{
if ((int(sc_BlendMode_Min_tmp)!=0))
{
l9_1965=1.0-fast::clamp(dot(l9_1964.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_Max_tmp)!=0))
{
l9_1965=fast::clamp(dot(l9_1964.xyz,float3(1.0)),0.0,1.0);
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
float l9_1966=l9_1965;
float l9_1967=l9_1966;
float l9_1968=(*sc_set0.UserUniforms).sc_ShadowDensity*l9_1967;
float3 l9_1969=mix((*sc_set0.UserUniforms).sc_ShadowColor.xyz,(*sc_set0.UserUniforms).sc_ShadowColor.xyz*l9_1963.xyz,float3((*sc_set0.UserUniforms).sc_ShadowColor.w));
float4 l9_1970=float4(l9_1969.x,l9_1969.y,l9_1969.z,l9_1968);
param_9=l9_1970;
}
else
{
if ((int(sc_RenderAlphaToColor_tmp)!=0))
{
param_9=float4(param_9.w);
}
else
{
if ((int(sc_BlendMode_Custom_tmp)!=0))
{
float4 l9_1971=param_9;
float4 l9_1972=float4(0.0);
float4 l9_1973=float4(0.0);
if ((int(sc_FramebufferFetch_tmp)!=0))
{
float4 l9_1974=out.sc_FragData0;
l9_1973=l9_1974;
}
else
{
float4 l9_1975=gl_FragCoord;
float2 l9_1976=l9_1975.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_1977=l9_1976;
float2 l9_1978=float2(0.0);
if (sc_StereoRenderingMode_tmp==1)
{
int l9_1979=1;
int l9_1980=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1980=0;
}
else
{
l9_1980=in.varStereoViewID;
}
int l9_1981=l9_1980;
int l9_1982=l9_1981;
float3 l9_1983=float3(l9_1977,0.0);
int l9_1984=l9_1979;
int l9_1985=l9_1982;
if (l9_1984==1)
{
l9_1983.y=((2.0*l9_1983.y)+float(l9_1985))-1.0;
}
float2 l9_1986=l9_1983.xy;
l9_1978=l9_1986;
}
else
{
l9_1978=l9_1977;
}
float2 l9_1987=l9_1978;
float2 l9_1988=l9_1987;
float2 l9_1989=l9_1988;
float2 l9_1990=l9_1989;
float l9_1991=0.0;
int l9_1992;
if ((int(sc_ScreenTextureHasSwappedViews_tmp)!=0))
{
int l9_1993=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1993=0;
}
else
{
l9_1993=in.varStereoViewID;
}
int l9_1994=l9_1993;
l9_1992=1-l9_1994;
}
else
{
int l9_1995=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1995=0;
}
else
{
l9_1995=in.varStereoViewID;
}
int l9_1996=l9_1995;
l9_1992=l9_1996;
}
int l9_1997=l9_1992;
float2 l9_1998=l9_1990;
int l9_1999=sc_ScreenTextureLayout_tmp;
int l9_2000=l9_1997;
float l9_2001=l9_1991;
float2 l9_2002=l9_1998;
int l9_2003=l9_1999;
int l9_2004=l9_2000;
float3 l9_2005=float3(0.0);
if (l9_2003==0)
{
l9_2005=float3(l9_2002,0.0);
}
else
{
if (l9_2003==1)
{
l9_2005=float3(l9_2002.x,(l9_2002.y*0.5)+(0.5-(float(l9_2004)*0.5)),0.0);
}
else
{
l9_2005=float3(l9_2002,float(l9_2004));
}
}
float3 l9_2006=l9_2005;
float3 l9_2007=l9_2006;
float4 l9_2008=sc_set0.sc_ScreenTexture.sample(sc_set0.sc_ScreenTextureSmpSC,l9_2007.xy,bias(l9_2001));
float4 l9_2009=l9_2008;
float4 l9_2010=l9_2009;
l9_1973=l9_2010;
}
float4 l9_2011=l9_1973;
float3 l9_2012=l9_2011.xyz;
float3 l9_2013=l9_2012;
float3 l9_2014=l9_1971.xyz;
float3 l9_2015=definedBlend(l9_2013,l9_2014,in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.intensityTexture,sc_set0.intensityTextureSmpSC);
l9_1972=float4(l9_2015.x,l9_2015.y,l9_2015.z,l9_1972.w);
float3 l9_2016=mix(l9_2012,l9_1972.xyz,float3(l9_1971.w));
l9_1972=float4(l9_2016.x,l9_2016.y,l9_2016.z,l9_1972.w);
l9_1972.w=1.0;
float4 l9_2017=l9_1972;
param_9=l9_2017;
}
else
{
if ((int(sc_Voxelization_tmp)!=0))
{
float4 l9_2018=float4(in.varScreenPos.xyz,1.0);
param_9=l9_2018;
}
else
{
if ((int(sc_OutputBounds_tmp)!=0))
{
float4 l9_2019=gl_FragCoord;
float l9_2020=fast::clamp(abs(l9_2019.z),0.0,1.0);
float4 l9_2021=float4(l9_2020,1.0-l9_2020,1.0,1.0);
param_9=l9_2021;
}
else
{
float4 l9_2022=param_9;
float4 l9_2023=float4(0.0);
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_2023=float4(mix(float3(1.0),l9_2022.xyz,float3(l9_2022.w)),l9_2022.w);
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0)||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
float l9_2024=l9_2022.w;
if ((int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_2024=fast::clamp(l9_2024,0.0,1.0);
}
l9_2023=float4(l9_2022.xyz*l9_2024,l9_2024);
}
else
{
l9_2023=l9_2022;
}
}
float4 l9_2025=l9_2023;
param_9=l9_2025;
}
}
}
}
}
float4 l9_2026=param_9;
FinalColor=l9_2026;
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
float4 l9_2027=float4(0.0);
l9_2027=float4(0.0);
float4 l9_2028=l9_2027;
float4 Cost=l9_2028;
if (Cost.w>0.0)
{
FinalColor=Cost;
}
FinalColor=fast::max(FinalColor,float4(0.0));
float4 param_10=FinalColor;
FinalColor=sc_OutputMotionVectorIfNeeded(param_10,in.varPosAndMotion,in.varNormalAndMotion);
float4 param_11=FinalColor;
float4 l9_2029=param_11;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_2029.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
out.sc_FragData0=l9_2029;
return out;
}
} // FRAGMENT SHADER
