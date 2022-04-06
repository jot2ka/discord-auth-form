import classes from './Background.module.scss'

export default function Background() {
	return (
		<div className={classes.canvas}>
			<div className={classes.cloud1}>
				<div className={classes.circle1} />
				<div className={classes.circle2} />
				<div className={classes.circle3} />
				<div className={classes.circle4} />
				<div className={classes.circle5} />
				<div className={classes.circle6} />
			</div>
			<div className={classes.cloud2}>
				<div className={classes.circle1} />
				<div className={classes.circle2} />
				<div className={classes.circle3} />
			</div>
			<div className={classes.cloud3}>
				<div className={classes.circle1} />
				<div className={classes.circle2} />
				<div className={classes.circle3} />
				<div className={classes.circle4} />
			</div>
		</div>
	)
}
