<template>
    <div>
        <div class="dialog">
            <p>本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。
            </p>
            <span class="close" @click='clickclose'>x</span>
        </div>
        <div class="tanchuang" @click='clickclose'></div>
    </div>
</template>

<script>
    export default {
        methods: {
            clickclose () {
                this.$emit('closeabout')
            }
        }
    }
</script>
<style scoped>
    .tanchuang{
        width:100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        left: 0;
        top: 0;

    }
    .dialog{
        width: 600px;
        height: 100px;
        position: fixed;
        left: 30%;
        top: 20%;
        background-color: #fff;
        padding: 30px;
        border: 2px solid #464068;
        z-index: 10;
    }
    .dialog p{
        line-height: 18px;
    }
    .dialog .close{
        position: absolute;
        right: 8px;
        top: 8px;
        cursor: pointer;
    }
    .dialog .close:hover {
        color: #4fc08d;
    }

</style>